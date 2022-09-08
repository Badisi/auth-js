import 'demo-app-common';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageModule } from './components/page/page.module';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
    declarations: [
        DemoComponent
    ],
    imports: [
        CommonModule,
        DemoRoutingModule,
        FormsModule,
        HttpClientModule,
        PageModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DemoModule { }
