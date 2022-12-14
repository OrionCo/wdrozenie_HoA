import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlComponent } from 'src/app/shared/abstract-control.component';

@Component({
  selector: 'app-control-input',
  templateUrl: './control-input.component.html',
  styleUrls: ['./control-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlInputComponent extends AbstractControlComponent {
  constructor() {
    super();
  }
}
