import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    standalone: true
})
export class PageComponent implements OnInit {
    public title = '';

    private route = inject(ActivatedRoute);

    public ngOnInit(): void {
        this.title = this.route.snapshot.data['title'] as string;
    }
}
