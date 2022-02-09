import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSettings, Log, Navigation } from '@badisi/ngx-auth';

const DEMO_APP_NGX_AUTH_SETTING_STORAGE_KEY = 'demo-app_ngx-auth-settings';

const controls: { [key in keyof AuthSettings]: FormControl } = {
    authorityUrl: new FormControl('http://localhost:8080/auth/realms/demo', Validators.required),
    clientId: new FormControl('demo-app', Validators.required),
    schemeUri: new FormControl('demo-app'),
    loginRequired: new FormControl(false),
    loadSession: new FormControl(true),
    loadUserInfo: new FormControl(true),
    automaticLoginOn401: new FormControl(true),
    automaticInjectToken: new FormControl(true),
    automaticSilentRenew: new FormControl(true),
    authGuardRedirectUrl: new FormControl('/forbidden'),
    scope: new FormControl('openid profile email phone'),
    navigationType: new FormControl(Navigation.REDIRECT),
    logLevel: new FormControl(Log.NONE)
};

const formControls = new FormGroup(controls);
const defaultSettings = formControls.value as AuthSettings;

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public settings = formControls;

    public static loadSettings(): AuthSettings {
        const userSettings = sessionStorage.getItem(DEMO_APP_NGX_AUTH_SETTING_STORAGE_KEY);
        if (userSettings) {
            return { ...defaultSettings, ...JSON.parse(userSettings) as AuthSettings };
        }
        return defaultSettings;
    }

    public ngOnInit(): void {
        this.settings.patchValue(SettingsComponent.loadSettings());
    }

    public apply(): void {
        if (this.settings.valid) {
            this.saveAndReload();
        }
    }

    public cancel(): void {
        this.settings.get('authorityUrl')?.hasError('required');
        this.settings.reset(SettingsComponent.loadSettings());
    }

    public reset(): void {
        this.settings.reset(defaultSettings);
        this.saveAndReload();
    }

    // --- HELPER(s) ---

    private saveAndReload(): void {
        sessionStorage.setItem(DEMO_APP_NGX_AUTH_SETTING_STORAGE_KEY, JSON.stringify(this.settings.value));
        location.reload();
    }
}
