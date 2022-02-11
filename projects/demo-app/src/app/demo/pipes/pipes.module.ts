import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrettyPrintPipe } from './pretty-print.pipe';

@NgModule({
    declarations: [
        PrettyPrintPipe
    ],
    exports: [
        PrettyPrintPipe
    ],
    providers: [
        DatePipe
    ]
})
export class PipesModule { }
