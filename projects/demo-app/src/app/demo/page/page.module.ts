import { NgModule } from '@angular/core';

import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';

@NgModule({
    declarations: [
        PageComponent
    ],
    imports: [
        PageRoutingModule
    ]
})
export class PageModule { }
