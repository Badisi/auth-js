import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    public title = '';

    constructor(
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.title = this.route.snapshot.data['title'] as string;
    }
}
