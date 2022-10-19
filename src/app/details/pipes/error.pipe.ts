import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorPipe',
})
export class ErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors) {
    for (const key in errors) {
      switch (key) {
        case 'minlength':
          return `The minimum length is ${errors[key].requiredLength}.`;
        case 'maxlength':
          return `The maximum length is ${errors[key].requiredLength}.`;
        case 'required':
          return 'This field is required';
        case 'min':
          return `Minimum value is ${errors[key].min}.`;
      }
    }
    return 'This field is invalid';
  }
}
