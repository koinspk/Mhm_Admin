import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateformat',
  standalone: true
})
export class DateformatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return value;
    return moment(value).format('DD-MM-YYYY');
  }

}
