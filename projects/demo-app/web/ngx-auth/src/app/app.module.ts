import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@badisi/ngx-auth';

import { AppComponent } from './app.component';
import { AppRoutingModule as zAppRoutingModule } from './app-routing.module';
import { DemoModule } from './demo/demo.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AuthModule,
        BrowserModule,
        CommonModule,
        DemoModule,
        zAppRoutingModule // should be imported last
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
