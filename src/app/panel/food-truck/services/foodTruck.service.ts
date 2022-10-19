import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodTrucksService {
  readonly url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getFoodTrucks(day: any, hour: any): Observable<any> {
    return this.http.get(`${this.url}/api/FoodTruck/ObtenerFoodTrucks?DayOrder=`+day +`&HourOrder=`+hour);
  }
}