import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSettings } from '@badisi/ngx-auth';

import { LibrarySettings } from '../../models/library-settings.model';
import { DemoService } from '../../services/demo.service';

const controls: { [key in keyof AuthSettings]: FormControl | FormGroup } = {
    authorityUrl: new FormControl('', Validators.required),
    clientId: new FormControl('', Validators.required),
    schemeUri: new FormControl(),
    loginRequired: new FormControl(),
    loadSession: new FormControl(),
    loadUserInfo: new FormControl(),
    automaticLoginOn401: new FormControl(),
    automaticInjectToken: new FormControl(),
    automaticSilentRenew: new FormControl(),
    authGuardRedirectUrl: new FormControl(),
    scope: new FormControl(),
    internal: new FormGroup({
        extraQueryParams: new FormControl()
    }),
    navigationType: new FormControl(),
    logLevel: new FormControl()
};

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public settings = new FormGroup(controls);

    public ngOnInit(): void {
        this.settings.patchValue(DemoService.getLibrarySettings());
    }

    public apply(): void {
        if (this.settings.valid) {
            this.saveAndReload();
        }
    }

    public cancel(): void {
        this.settings.get('authorityUrl')?.hasError('required');
        this.settings.reset(DemoService.getLibrarySettings());
    }

    public reset(): void {
        DemoService.reset();
        location.reload();
    }

    // --- HELPER(s) ---

    private saveAndReload(): void {
        DemoService.saveLibrarySettings(this.settings.value as LibrarySettings);
        location.reload();
    }
}
