import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing';

@NgModule({
    declarations: [
        DemoComponent,
        PublicComponent,
        PrivateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        DemoRoutingModule
    ]
})
export class DemoModule { }
