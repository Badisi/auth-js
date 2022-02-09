import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DebugComponent } from './debug.component';
import { PrettyPrintPipe } from './pretty-print.pipe';

@NgModule({
    declarations: [
        DebugComponent,
        PrettyPrintPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DebugComponent
    ],
    providers: [
        DatePipe
    ]
})
export class DebugModule { }
