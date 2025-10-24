/* eslint-disable camelcase, no-loops/no-loops */
// @ts-check

import chalk from 'chalk';
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { releaseChangelog, releasePublish, releaseVersion } from 'nx/release/index.js';
import { createProjectGraphAsync, readProjectsConfigurationFromProjectGraph } from 'nx/src/project-graph/project-graph.js';
import { workspaceRoot } from 'nx/src/utils/workspace-root.js';
import yargs from 'yargs';

/**
 *  @typedef {import("nx/src/config/workspace-json-project-json").ProjectsConfigurations} ProjectsConfigurations
 *  @typedef {import("nx/src/command-line/release/command-object").PublishOptions} PublishOptions
 *  @typedef {import("nx/src/command-line/release/utils/shared").VersionData} VersionData
 *  @typedef {import("nx/src/utils/package-json").PackageJson} PackageJson
 */

/**
 *  @typedef {{
 *      projects: string[];
 *      dryRun: boolean;
 *      verbose: boolean;
 *  }} ScriptOptions
 */

/**
 *  @typedef {{
 *      projectsToRelease: string[];
 *      workspaceVersion: (string | null) | undefined;
 *      projectsVersionData: VersionData;
 *  }} Updates
 */

const { yellow, blue, red, green, gray, white, cyan, bgBlue } = chalk;

/**
 *  @type {(message: string, cmd: string, args: string[], options: ScriptOptions, newLine?: boolean) => void}
 */
const exec = (message, cmd, args, options, newLine = false) => {
    console.log(`${message}${options.dryRun ? yellow(' [dry-run]') : ''}${newLine ? '\n' : ''}`);
    if (options.verbose) {
        console.log(`${cmd} ${args.join(' ')}`);
    }
    if (!options.dryRun) {
        const result = spawnSync(cmd, args, { stdio: 'inherit', cwd: workspaceRoot });
        if (result.error) {
            throw result.error;
        }
        if (result.status !== 0) {
            throw new Error(`Command failed with exit code ${result.status}`);
        }
    }
};

/**
 *  Currently `nx release` does not allow to easily change the folder to be published.
 *
 *  `nx.json#targetDefaults.nx-release-publish.options.packageRoot` could be used but can only interpolate:
 *  - {projectName}: which resolved to '@badisi/abc' (ie. package.json#name)
 *  - {projectRoot}: which resolved to 'libs/abc'
 *  And what we need is actually `abc` because Angular generates projects in `dist/abc`.
 *  So to make it work, we use the hidden option (__overrides_unparsed__) and publish each project individually.
 *  @type {(projectsToRelease: string[], projects: ProjectsConfigurations['projects'], options: ScriptOptions) => Promise<number>}
 */
const publishProjects = async (projectsToRelease, projects, options) => {
    let processStatus = 0;
    if (!options.dryRun) {
        for (const project of projectsToRelease) {
            const projectName = projects[project].root.substring('libs/'.length);
            /** @type {PublishOptions & {__overrides_unparsed__: string}} */
            const args = {
                __overrides_unparsed__: `--packageRoot=./dist/${projectName}`,
                projects: [project],
                dryRun: options.dryRun,
                verbose: options.verbose
            };
            const publishResult = await releasePublish(args);
            if (publishResult[project].code !== 0) {
                processStatus = publishResult[project].code;
            }
        }
    } else {
        console.log(`\n${bgBlue(' EXTRA ')}  ${blue('Publishing to npm')}${yellow(' [dry-run]')}\n`);
    }
    return processStatus;
};

/**
 *  Currently `nx release` publishes packages from their source directory by default.
 *
 *  So we need to make sure `dist` are in sync and used for publishing instead.
 *  @type {(projectsToRelease: string[], projects: ProjectsConfigurations['projects'], projectsVersionData: VersionData, options: ScriptOptions) => void}
 *
 *  TODO: remove this script if one day this feature is supported by `nx release` directly
 *  @see https://github.com/nrwl/nx/issues/21855#issuecomment-1977360480
 */
const updateProjectsDists = (projectsToRelease, projects, projectsVersionData, options) => {
    console.log(`\n${bgBlue(' EXTRA ')}  ${blue('Synchronizing dist packages')}${options.dryRun ? yellow(' [dry-run]') : ''}`);
    projectsToRelease.forEach(project => {
        const projectRoot = projects[project].root;
        const projectName = projects[project].name ?? '';
        const projectNewVersion = projectsVersionData[project].newVersion ?? '';
        const distPackageJsonPath = join('dist', projectName, 'package.json');
        const distChangelogPath = join('dist', projectName, 'CHANGELOG.md');
        const workspacePackageJsonPath = join(projectRoot, 'package.json');
        /** @type {PackageJson} */
        const workspacePackageJson = JSON.parse(readFileSync(join(workspaceRoot, workspacePackageJsonPath), 'utf8'));

        console.log(`\n${cyan(projects[project].name ?? '')} New version ${projectNewVersion} written to ${distPackageJsonPath}`);
        if (!options.dryRun) {
            /** @type {PackageJson} */
            const distPackageJson = JSON.parse(readFileSync(join(workspaceRoot, distPackageJsonPath), 'utf8'));
            distPackageJson.version = projectNewVersion;
            distPackageJson.peerDependencies = workspacePackageJson.peerDependencies;
            writeFileSync(join(workspaceRoot, distPackageJsonPath), JSON.stringify(distPackageJson, null, 4), {
                encoding: 'utf8'
            });
        }

        console.log(`${cyan(projects[project].name ?? '')} Changelog updated in ${distChangelogPath}`);
        if (!options.dryRun) {
            copyFileSync(join(workspaceRoot, projectRoot, 'CHANGELOG.md'), join(workspaceRoot, distChangelogPath));
        }
    });
};

/**
 *  Ensures consistent versioning across interdependent packages in the monorepo.
 *
 *  It reads the current version of each package and updates any other packages that reference
 *  it in their `peerDependencies` to maintain version synchronization.
 *  @type {(projectsToRelease: string[], projects: ProjectsConfigurations['projects'], projectsVersionData: VersionData, options: ScriptOptions) => boolean}
 *
 *  TODO: remove this script if one day this feature is supported by `nx release` directly
 *  @see https://github.com/nrwl/nx/issues/22776
 *  @see https://github.com/nrwl/nx/discussions/23388
 */
const updateProjectsPeerDeps = (projectsToRelease, projects, projectsVersionData, options) => {
    /** @type {string[]} */
    let packageJsonFiles = [];
    let changesDetected = false;

    console.log(`\n${bgBlue(' EXTRA ')}  ${blue('Synchronizing inter peer dependencies')}${options.dryRun ? yellow(' [dry-run]') : ''}`);
    projectsToRelease.forEach(projectToRelease => {
        const projectToReleaseNewVersion = projectsVersionData[projectToRelease].newVersion ?? '';

        Object.values(projects).forEach(project => {
            const packageJsonPath = join(project.root, 'package.json');
            if (existsSync(packageJsonPath)) {
                /** @type {PackageJson} */
                const packageJson = JSON.parse(readFileSync(join(workspaceRoot, packageJsonPath), 'utf8'));
                const peerDependencies = packageJson.peerDependencies ?? {};

                if (Object.hasOwn(peerDependencies, projectToRelease)) {
                    const version = peerDependencies[projectToRelease];
                    if (!version.includes(projectToReleaseNewVersion)) {
                        changesDetected = true;

                        // Récupère le premier caractère non numérique pour conserver le préfixe
                        const versionRange = /(^[^\d]*)\d.*/.exec(version)?.[1] ?? '';
                        const newVersion = `${versionRange}${projectToReleaseNewVersion}`;

                        if (!packageJsonFiles.length) {
                            console.log(blue(`\n- ${projectToRelease}`));
                        }

                        console.log(`\n${white('UPDATE')} ${packageJsonPath}${options.dryRun ? yellow(' [dry-run]') : ''}\n`);
                        console.log(gray('  "peerDependencies": {'));
                        console.log(red(`-    "${projectToRelease}": "${version}"`));
                        console.log(green(`+    "${projectToRelease}": "${newVersion}"`));
                        console.log(gray('  }'));
                        if (!options.dryRun) {
                            peerDependencies[projectToRelease] = newVersion;
                            packageJson.peerDependencies = peerDependencies;
                            writeFileSync(join(workspaceRoot, packageJsonPath), JSON.stringify(packageJson, null, 4), {
                                encoding: 'utf8'
                            });
                        }

                        packageJsonFiles.push(packageJsonPath);
                    }
                }
            }
        });

        if (packageJsonFiles.length) {
            exec(
                '\nUpdating npm lock file:',
                'npm',
                [
                    'install',
                    '--package-lock-only',
                    '--ignore-scripts'
                ],
                options
            );
            exec(
                '\nStaging changed files with git:',
                'git',
                [
                    'add',
                    'package-lock.json',
                    ...packageJsonFiles
                ],
                options
            );
            exec(
                '\nComitting changes with git:',
                'git',
                [
                    'commit',
                    '--message',
                    `deps(${projectToRelease}): upgrade to v${projectToReleaseNewVersion}`,
                    '--message',
                    '[skip ci]' // add the skip-ci in a separate commit so that it does not appears on the release note
                ],
                options
            );
            packageJsonFiles = [];
        }
    });

    if (changesDetected) {
        exec(
            `\n${bgBlue(' EXTRA ')}  ${blue('Pushing to git remote')}`,
            'git',
            [
                'push',
                '--follow-tags',
                '--no-verify',
                '--atomic'
            ],
            options,
            true
        );
    } else {
        console.log('\nNo changes were needed, versions already in sync.');
    }

    return changesDetected;
};

/**
 *  @type {(gitCommitMessage: string, options: ScriptOptions) => Promise<Updates>}
 */
const updateProjectsVersions = async (gitCommitMessage, options) => {
    const { workspaceVersion, projectsVersionData } = await releaseVersion({
        projects: options.projects,
        stageChanges: true,
        gitCommit: true,
        gitCommitMessage,
        versionActionsOptionsOverrides: {
            installIgnoreScripts: true
        },
        dryRun: options.dryRun,
        verbose: options.verbose
    });
    const projectsToRelease = Object.keys(projectsVersionData).filter(key => {
        const { newVersion, currentVersion } = projectsVersionData[key];
        return newVersion && newVersion !== currentVersion;
    });
    if (projectsToRelease.length === 0) {
        console.log('No affected projects found to be published');
        return process.exit(0);
    }
    return { projectsToRelease, workspaceVersion, projectsVersionData };
};

/**
 *  @type {() => Promise<void>}
 */
void (async () => {
    const projectGraph = await createProjectGraphAsync({ exitOnError: true });
    const { projects } = readProjectsConfigurationFromProjectGraph(projectGraph);
    const options = await yargs(process.argv)
        .version(false)
        .option('projects', {
            description: 'Projects filter to use for the release script',
            type: 'array',
            string: true,
            default: []
        })
        .option('dry-run', {
            description: 'Whether or not to perform a dry-run of the release process, defaults to false',
            type: 'boolean',
            default: false
        })
        .option('verbose', {
            description: 'Whether or not to enable verbose logging, defaults to false',
            type: 'boolean',
            default: false
        })
        .parseAsync();

    /**
     *   1. Resolve new versions of projects using semantic versioning
     *   2. Update every projects `package.json` file with their new version
     *   3. Update npm lock file
     *   4. Stage changed files with git
     *   5. Commit all previously staged files in git
     *        chore(release): update projects versions [skip ci]
     *        - project: @badisi/abc 1.2.3
     *        - project: @badisi/xyz 4.5.6
     */
    let updates = await updateProjectsVersions('chore(release): update projects versions [skip ci]', options);

    /**
     *   6. Synchronize inter peer dependencies
     *      For each project:
     *      - Update project's package.json file
     *      - Update npm lock file
     *      - Stage changed files with git
     *      - Commit all previously staged files in git
     *          deps(@badisi/abc): upgrade to v1.2.3
     *          [skip ci]
     *   7. Push to git remote
     */
    const needReUpdate = updateProjectsPeerDeps(updates.projectsToRelease, projects, updates.projectsVersionData, options);

    /**
     *  If multiple projects were to be released, synchronizing inter peer dependencies might have affected some of them.
     *  So we need to resolve new versions of projects once more.
     *
     *   8. Resolve new versions of projects using semantic versioning
     *   9. Update every projects `package.json` file with their new version
     *  10. Update npm lock file
     *  11. Stage changed files with git
     *  12. Commit all previously staged files in git
     *        chore(release): re-update projects versions [skip ci]
     *        - project: @badisi/abc 1.2.3
     *        - project: @badisi/xyz 4.5.6
     */
    if (needReUpdate && options.projects?.length !== 1) {
        updates = await updateProjectsVersions('chore(release): re-update projects versions [skip ci]', options);
    }

    /**
     *  13. Update every projects `CHANGELOG.md` file
     *  14. Stage changed files with git
     *  15. Commit all previously staged files in git
     *        chore(release): update projects changelogs [skip ci]
     *        - project: @badisi/abc 1.2.3
     *        - project: @badisi/xyz 4.5.6
     *  16. Tag commit with git
     *        + @badisi/abc@1.2.3
     *        + @badisi/xyz@5.6.7
     *  17. Push to git remote
     *  18. Create GitHub releases
     */
    await releaseChangelog({
        projects: updates.projectsToRelease,
        version: updates.workspaceVersion,
        versionData: updates.projectsVersionData,
        stageChanges: true,
        gitCommit: true,
        gitCommitMessage: 'chore(release): update projects changelogs [skip ci]',
        gitTag: true,
        dryRun: options.dryRun,
        verbose: options.verbose
    });

    /**
     *   19. Update projects `package.json` and `CHANGELOG.md` in their dist folder
     */
    updateProjectsDists(updates.projectsToRelease, projects, updates.projectsVersionData, options);

    /**
     *   20. Publish projects to npm
     */
    const publishStatus = await publishProjects(updates.projectsToRelease, projects, options);

    return process.exit(publishStatus);
})();
