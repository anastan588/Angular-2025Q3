import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatvalues',
})
export class FormatvaluesPipe implements PipeTransform {
  transform(value: { amount: number; unit: string }): string {
    if (!value || typeof value.amount !== 'number' || !value.unit) {
      return 'Invalid value';
    }
    return `${value.amount} ${value.unit}`;
  }
}
