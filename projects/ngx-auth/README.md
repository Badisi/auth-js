ngx-auth
=======

Authentication and authorization support for angular based client applications.

License: UNLICENSED

## Getting started

1. Run `yarn add @badisi/ngx-auth` to install the library.

2. Import the `AuthModule` in your AppModule:

    ```ts
    import { AuthModule, AuthService } from '@badisi/ngx-auth/core';

    export function authServiceInitializerFactory(authService: AuthService): () => Promise<any> {
        return () => authService.init();
    });

    @NgModule({
        imports: [
            AuthModule.forRoot({
                serviceClass: AuthService,
                initializerFactory: authServiceInitializerFactory
            })
        ]
    })
    export class AppModule { }
    ```

3. Choose an `AuthService` implementation:

    #### OIDCAuthService

    This implementation provides **OpenID Connect (OIDC)** and **OAuth2** protocol support.

    It mainly relies on the [oidc-client-js](https://github.com/IdentityModel/oidc-client-js/) library as it is a [Certified OpenID Connect Implementation](https://openid.net/developers/certified/).

    1. Specify the `OIDCAuthService` implementation and initialize it:

        ```ts
        import { OIDCAuthService } from '@badisi/ngx-auth/oidc';

        export function authServiceInitializerFactory(authService: OIDCAuthService): () => Promise<any> {
            return () => authService.init({
                authority: '/idp',
                client_id: 'client-id'
            });
        });

        AuthModule.forRoot({
            serviceClass: OIDCAuthService,
            initializerFactory: authServiceInitializerFactory
        })
        ```

    2. Add the following to your `angular.json`:

        ```json
        ...
        "architect": {
            "build": {
                "options": {
                    "assets": [
                        ...,
                        {
                            "glob": "silent_redirect.html",
                            "input": "node_modules/@badisi/ngx-auth/oidc/assets",
                            "output": "oidc/callback"
                        }
                    ]
                }
            }
        }
        ```

    4. Add mobile support (optional)

        a. Run `npm install cordova-plugin-customurlscheme`.

        b. Run `npm install git+https://github.com/Qbix/cordova-plugin-browsertab.git`.

        c. Run `npm install git+https://github.com/wzijden/cordova-plugin-secure-storage-echo.git`.

        d. Specify a scheme uri in both `OIDCAuthService` configuration and `package.json` configuration.

        ```ts
        authService.init({ scheme_uri: 'scheme-uri' });
        ```

        ```ts
        "cordova-plugin-customurlscheme": {
            "URL_SCHEME": "scheme-uri"
        }
        ```

    5. For DEBUGGING : you can enable log level as follow :

        ```ts
        import { Log } from 'oidc-client';

        authService.init({..., Log.DEBUG});
        ```

    #### Custom implementation

    Custom implementation can easily be made by simply inheriting from AuthService.

4. Configure the `AuthModule`:

    The AuthModule can be configured to activate or deactivate interceptor fully or partially.

    By default the auth token will be injected to requests made to `/api` and 401 errors will trigger a new login process.

    If the default behavior does not suit you, you can use the following for greater ease:

    ```ts
    AuthModule.forRoot({
        ...
        autoLoginOn401: {true|false},
        autoInjectToken: {
            include: ['/rest', '**/*.json'],
            exclude: ['**/data-*.json']
        }
        // autoInjectToken: {true|false}, /** will inject or not the token to any requests */
    })
    ```

## Usage

* An `AuthGuard` is available for routing

    ```ts
    import { AuthGuard } from '@badisi/ngx-auth/core';

    const routes: Routes = [{
        path: 'private',
        component: PrivateComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    }];
    ```

* An `AuthService` is available with the followings methods :

    ```ts
    login(redirectUrl?: string): Promise<void>
    logout(redirectUrl?: string): Promise<void>
    refresh(): Promise<UserProfile>
    isAuthenticated(): Observable<boolean>
    getUserProfile(): UserProfile
    getUserSession(): UserSession
    getAccessToken(): string
    ```

    Example :

    ```ts
    import { Component, OnDestroy, OnInit } from '@angular/core';
    import { AuthService, UserProfile } from '@badisi/ngx-auth/core';
    import { Subscription } from 'rxjs';

    @Component()
    export class AppComponent implements OnInit, OnDestroy {
        private authenticatedSub$: Subscription;

        public userProfile: UserProfile;
        public isAuthenticated: boolean;

        constructor(
            private authService: AuthService
        ) { }

        ngOnInit() {
            // Observe authentication
            this.authenticatedSub$ = this.authService
                .isAuthenticated()
                .subscribe((value: boolean) => {
                    this.isAuthenticated = value;
                    this.userProfile = this.authService.getUserProfile();
                });
        }

        ngOnDestroy() {
            this.authenticatedSub$.unsubscribe();
        }

        login() {
            this.authService.login();
        }

        logout() {
            this.authService.logout('/');
        }
    }
    ```

* An `AuthImageComponent` is available for displaying secured images

    ```ts
    import { AuthImageModule } from '@badisi/ngx-auth/auth-image';
    ```

    ```html
    <ngx-auth-img [src]="IMAGE_URL"></ngx-auth-img>
    ```
