import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prepTime',
})
export class PrepTimePipe implements PipeTransform {
  transform(time: number): string {
    const hours: number = Math.floor(time / 60);
    const hoursValue: string = hours ? `${hours}h ` : '';
    const minutesValue: string = `${time - hours * 60}m`;

    return `${hoursValue}${minutesValue}`;
  }
}
