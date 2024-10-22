import { Injectable } from '@angular/core';
import { concatAll, concatMap, delay, Observable, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getCurrentTemperature() {
    return new Observable(observer => {
      setInterval(() => {
        observer.next(randomInt(10, 30))
      }, 1000);
    })
  }

  getYearsSales() {
    return of([12, 58, 7, 89, 123, 54, 74, 20, 88, 47, 25, 185])
      .pipe(concatAll(), concatMap(x => of(x).pipe(delay(1000))));
  }
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}