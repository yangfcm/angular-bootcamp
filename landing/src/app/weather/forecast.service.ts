import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  map,
  switchMap,
  pluck,
  mergeMap,
  filter,
  toArray,
  retry,
  tap,
  catchError,
  share,
} from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';

interface IOpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getForecast() {
    return this.getLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', '2bf49136311bcaad1894c3956871fbc2');
      }),
      switchMap((params) => {
        return this.http.get<IOpenWeatherResponse>(this.url, { params });
      }),
      pluck('list'),
      mergeMap((value) => {
        return of(...value);
      }),
      filter((value, index) => {
        return index % 8 === 0;
      }),
      map((value) => {
        return {
          date: value.dt_txt,
          temp: value.main.temp,
        };
      }),
      toArray(),
      share()
    );
  }

  getLocation() {
    return new Observable<Coordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(1),
      tap(() => {
        this.notificationsService.addSuccess('Got your location');
      }),
      catchError((err) => {
        this.notificationsService.addError('Failed to get location');
        return throwError(err);
      })
    );
  }
}
