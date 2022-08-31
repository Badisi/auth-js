import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { globalStyle, prettyPrint } from 'demo-app-common';

import { PlaygroundSettings } from './playground-settings.model';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss'],
    styles: [globalStyle],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class PlaygroundComponent {
    public settings = window.appSettings.getCurrentUserSettings().otherSettings as PlaygroundSettings ?? {};
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
                    this.data = prettyPrint(data);
                },
                error: (error: Error) => {
                    this.dataOnError = true;
                    this.data = prettyPrint(error);
                }
            });
    }

    public saveSettings(): void {
        const currentUserSettings = window.appSettings.getCurrentUserSettings();
        currentUserSettings.otherSettings = this.settings;
        window.appSettings.addUserSettings(currentUserSettings);
    }
}
