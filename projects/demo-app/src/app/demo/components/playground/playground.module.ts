import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../../pipes/pipes.module';
import { PlaygroundComponent } from './playground.component';

@NgModule({
    declarations: [
        PlaygroundComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PipesModule,
        RouterModule
    ],
    exports: [
        PlaygroundComponent
    ]
})
export class PlaygroundModule { }
