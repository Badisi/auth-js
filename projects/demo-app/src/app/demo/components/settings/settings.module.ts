import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { JsonValueAccessorDirective } from './json-value-accessor.directive';
import { SettingsComponent } from './settings.component';

@NgModule({
    declarations: [
        JsonValueAccessorDirective,
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
