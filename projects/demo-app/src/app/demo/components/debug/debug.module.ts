import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '../../pipes/pipes.module';
import { DebugComponent } from './debug.component';

@NgModule({
    declarations: [
        DebugComponent
    ],
    imports: [
        CommonModule,
        PipesModule
    ],
    exports: [
        DebugComponent
    ]
})
export class DebugModule { }
