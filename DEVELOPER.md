# Development

This document describes how you can test, build and publish the library.

## Prerequisite

Before you can build and test this library you must install and configure the following products on your development machine:

* [Node.js][nodejs]
* [Git][git]

You will then need to install the library required dependencies:

```sh
cd <library-path>
npm install
```

## Testing locally

You can test the library while developing it, as follow:

1. Start the testing application

   ```sh
   npm start
   ```

2. Make any modifications

   * to the **library**: in `projects/library/src/`
   * to the **testing application**: in `projects/tests-app/src/`
   * to the **tests**: in `projects/tests/harness.e2e.ts`

3. Run the test

   ```sh
   npm run test
   ```

## Building the library

The library will be built in the `./dist` directory.

```sh
npm run build:lib
```

## Publishing to NPM repository

This project comes with automatic continuous delivery (CD) using *GitHub Actions*.

1. Bump the library version in `./package.json`
2. Push the changes
3. Create a new: [GitHub release](https://github.com/badisi/auth-js/releases/new)
4. Watch the results in: [Actions](https://github.com/badisi/auth-js/actions)



[git]: https://git-scm.com/
[nodejs]: https://nodejs.org/
