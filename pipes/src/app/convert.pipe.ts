import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert',
})
export class ConvertPipe implements PipeTransform {
  transform(value: number, ...args: any[]): number {
    console.log(value);
    if (!value) {
      return null;
    }
    const digit = args[0];
    if (digit) {
      return Number((value * 1.60934).toFixed(digit));
    }
    return value * 1.60934;
  }
}
