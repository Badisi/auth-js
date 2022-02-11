import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DemoService } from '../../services/demo.service';

export interface PlaygroundSettings {
    roles: string;
    privateApiUrl: string;
    privateApiHeaders: string;
}

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {
    public settings = DemoService.getPlaygroundSettings();
    public dataOnError?: boolean;
    public data: unknown | Error;

    constructor(
        private httpClient: HttpClient,
        public router: Router
    ) { }

    public callPrivateApi(): void {
        let headers = new HttpHeaders();
        this.settings.privateApiHeaders?.split(';').forEach(header => {
            const item = header.split(':');
            headers = headers.append(item[0]?.trim(), item[1]?.trim() || '');
        });

        this.httpClient
            .get<unknown>(this.settings.privateApiUrl, this.settings.privateApiHeaders ? { headers } : {})
            .subscribe({
                next: data => {
                    this.dataOnError = false;
                    this.data = data;
                },
                error: (error: Error) => {
                    this.dataOnError = true;
                    this.data = error;
                }
            });
    }

    public saveSettings(): void {
        DemoService.savePlaygroundSettings(this.settings);
    }
}
