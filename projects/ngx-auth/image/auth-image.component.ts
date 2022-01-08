import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ngx-auth-img',
    template: '',
    styleUrls: ['./auth-image.component.scss']
})
export class AuthImageComponent {
    private _src!: string;

    @Input()
    public set src(value: string) {
        if (this._src !== value) {
            this._src = value;
            this.refreshImage(value);
        }
    }

    public get src(): string {
        return this._src;
    }

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private httpClient: HttpClient
    ) { }

    // ---- HELPER(s) ----

    private refreshImage(url: string): void {
        this.httpClient
            .get(url, { responseType: 'blob' })
            .pipe(
                map((data: Blob) => {
                    this.elementRef.nativeElement.style.backgroundImage = `url(${URL.createObjectURL(data)})`;
                })
            )
            .subscribe();
    }
}
