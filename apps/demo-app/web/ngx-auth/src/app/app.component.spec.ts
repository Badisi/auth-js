import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppComponent,
                RouterModule.forRoot([])]
        }).compileComponents();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Welcome demo-app-ngx-auth');
    });

    it(`should have as title 'demo-app-ngx-auth'`, () => {
        // const fixture = TestBed.createComponent(AppComponent);
        // const app = fixture.componentInstance;
        // expect(app.title).toEqual('demo-app-ngx-auth');
    });
});
