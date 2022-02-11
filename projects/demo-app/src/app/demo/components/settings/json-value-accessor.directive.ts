import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[jsonValueAccessor]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => JsonValueAccessorDirective),
        multi: true
    }]
})
export class JsonValueAccessorDirective implements ControlValueAccessor {
    private onChange?: (value: unknown) => void;

    constructor(
        private elementRef: ElementRef<HTMLInputElement>
    ) { }

    @HostListener('input')
    public onInput(): void {
        this.onChange?.(JSON.parse(this.elementRef.nativeElement.value));
    }

    public writeValue(value: string): void {
        this.elementRef.nativeElement.value = (value) ? JSON.stringify(value) : '';
    }

    public registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public registerOnTouched(): void { }
}
