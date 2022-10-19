import { Directive, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  ValidationErrors,
} from '@angular/forms';

@Directive()
export class AbstracControlComponent implements ControlValueAccessor {
  @Input() formControl!: FormControl;
  @Input() hint?: string;
  @Input() type!: string;
  @Input() label!: string;
  @Input() maxLength?: number;

  constructor() {}

  get touched(): boolean {
    return this.formControl.touched;
  }

  get disabled(): boolean {
    return this.formControl.disabled;
  }

  get errors(): ValidationErrors | null {
    return this.touched && !this.disabled ? this.formControl.errors : null;
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
