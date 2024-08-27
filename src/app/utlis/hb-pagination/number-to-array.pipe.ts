import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray',
  standalone: true
})
export class NumberToArrayPipe implements PipeTransform {

  transform(value: number): any[] {
    return Array(Math.ceil(value)).fill(0).map((_, i) => i);
  }

}
