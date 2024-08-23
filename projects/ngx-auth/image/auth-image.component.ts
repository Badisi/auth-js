import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Input } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
    standalone: true,
    selector: 'ngx-auth-img',
    template: '',
    styles: [':host { background-position: center center; background-repeat: no-repeat; background-size: cover; }']
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AuthImage {
    #elementRef = inject<ElementRef<HTMLImageElement>>(ElementRef);
    #httpClient = inject(HttpClient);

    #src!: string;

    @Input()
    public set src(value: string) {
        if (this.#src !== value) {
            this.#src = value;
            this.refreshImage(value);
        }
    }

    public get src(): string {
        return this.#src;
    }

    // ---- HELPER(s) ----

    private refreshImage(url: string): void {
        this.#httpClient
            .get(url, { responseType: 'blob' })
            .pipe(
                map((data: Blob) => {
                    this.#elementRef.nativeElement.style.backgroundImage = `url(${URL.createObjectURL(data)})`;
                })
            )
            .subscribe();
    }
}
