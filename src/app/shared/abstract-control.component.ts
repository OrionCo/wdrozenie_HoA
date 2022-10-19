import { Directive, inject, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  ValidationErrors,
} from '@angular/forms';

@Directive()
export class AbstractControlComponent implements ControlValueAccessor, OnInit {
  protected _controlContainer: ControlContainer = inject(ControlContainer);
  @Input() hint?: string;
  @Input() type!: string;
  @Input() label!: string;
  @Input() maxLength?: number;
  @Input() controlName!: string;
  formControl!: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.formControl = this._controlContainer.control?.get(
      this.controlName
    ) as FormControl;
  }

  get touched(): boolean {
    return this.formControl.touched;
  }

  get disabled(): boolean {
    return this.formControl.disabled;
  }

  get errors(): ValidationErrors | null {
    return this.touched && !this.disabled ? this.formControl.errors : null;
  }

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
  setDisabledState?(): void {}
}
