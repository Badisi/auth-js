import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@badisi/ngx-auth/core';
import { OIDCAuthService } from '@badisi/ngx-auth/oidc';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DemoModule } from './demo/demo.module';
import { Log } from 'oidc-client';

export function authServiceInitializerFactory(authService: OIDCAuthService): () => Promise<any> {
    // TODO:
    return () => new Promise(resolve => {
        authService.init({
            authority: 'http://localhost:8080/auth/realms/master',
            client_id: 'ngx-auth-demo',
            scheme_uri: 'ngx-auth-demo',
            response_type: 'code'
        }, Log.NONE).then(userProfile => userProfile ? resolve(userProfile) : authService.login());
    });
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        DemoModule,
        AuthModule.forRoot({
            serviceClass: OIDCAuthService,
            initializerFactory: authServiceInitializerFactory
        }),
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
