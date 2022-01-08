# ngx-auth

Authentication and authorization support for angular based client applications.

License: GPL-3.0

## Getting started

Install `node v14.15.1`

Run `npm install` to install all the required dependencies.

## Building the library

Run `npm run build:lib` to build the library.

The build artifacts will be stored in the `dist/` directory.

## Publishing the library

1. Increment the version number in `package.json` and `projects/ngx-auth/package.json`.
2. Build the library
3. Run `npm run publish:lib` to publish the library to the **nexus npm-internal** repo.

## Linking the library

During development, you can link the library to an angular project.

:warning: Be careful not to commit the following modifications !

##### Linking with distribution

```sh
cd dist/ngx-auth
yarn link
```

```sh
cd my-angular-project
yarn link @badisi/ngx-auth
```

Add the following to `my-angular-project/angular.json`:

```json
"architect": {
    "build": {
        "options": {
            "preserveSymlinks": true
        }
    }
}
```

##### Linking with sources

```sh
cd projects/ngx-auth
yarn link
```

```sh
cd my-angular-project
yarn link @badisi/ngx-auth
```

Add the following to `my-angular-project/angular.json`:

```json
"architect": {
    "build": {
        "options": {
            "preserveSymlinks": true
        }
    }
}
```

Add the following to `my-angular-project/tsconfig.app.json`:

```json
"include": [
    "./**/*",
    "../node_modules/@badisi/ngx-auth/**/*"
]
```

## Demo app

Run `npm run start` for a dev server then navigate to `http://localhost:4200/`.
