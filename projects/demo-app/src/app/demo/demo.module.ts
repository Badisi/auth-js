import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DebugModule } from './components/debug/debug.module';
import { PageModule } from './components/page/page.module';
import { PlaygroundModule } from './components/playground/playground.module';
import { SettingsModule } from './components/settings/settings.module';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
    declarations: [
        DemoComponent
    ],
    imports: [
        CommonModule,
        DebugModule,
        DemoRoutingModule,
        PageModule,
        PlaygroundModule,
        SettingsModule
    ]
})
export class DemoModule { }
