import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { PublicComponent } from './public/public.component';

@NgModule({
    declarations: [
        DemoComponent,
        PublicComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        DemoRoutingModule,
        FormsModule,
        HttpClientModule
    ]
})
export class DemoModule { }
