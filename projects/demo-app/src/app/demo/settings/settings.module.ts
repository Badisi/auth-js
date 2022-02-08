import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        SettingsComponent
    ]
})
export class SettingsModule { }
