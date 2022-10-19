import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    // return super.transform(value("d MMMM y, h:mm:ss a"));
    return
  }

}
