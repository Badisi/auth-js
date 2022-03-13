import 'demo-app-common';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PageModule } from './components/page/page.module';
import { PlaygroundModule } from './components/playground/playground.module';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
    declarations: [
        DemoComponent
    ],
    imports: [
        CommonModule,
        DemoRoutingModule,
        PageModule,
        PlaygroundModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DemoModule { }
