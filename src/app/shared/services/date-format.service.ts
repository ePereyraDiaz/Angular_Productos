import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }


  setDateFormat(dtm: string) {

    var fecha!: any;
    fecha = dtm;
    return fecha
  }

  setFormat(date: any, notAddDay?: boolean) {
    date = new Date(date);
    date.setDate(date.getDate() + (notAddDay ? 0 : 1));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  }

  toFillFormatFromIsoString(date: string) {
    return `${date.split('T')[0]}`;
  }
}
