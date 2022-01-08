import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthImageComponent } from './auth-image.component';

@NgModule({
    exports: [
        AuthImageComponent
    ],
    declarations: [
        AuthImageComponent
    ],
    imports: [
        HttpClientModule
    ]
})
export class AuthImageModule { }
