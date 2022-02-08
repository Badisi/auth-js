import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DebugModule } from './debug/debug.module';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { PageModule } from './page/page.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
    declarations: [
        DemoComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        DebugModule,
        DemoRoutingModule,
        FormsModule,
        HttpClientModule,
        PageModule,
        SettingsModule
    ]
})
export class DemoModule { }
