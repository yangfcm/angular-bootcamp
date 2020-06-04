import { AsyncValidator, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate = (control: FormControl) => {
    const { value } = control;
    console.log(this.http);
    return this.http
      .post<any>(`${environment.apiUrl}/auth/username`, {
        username: value,
      })
      .pipe(
        map((value) => {
          if (value.available) {
            return null;
          }
        }),
        catchError((err) => {
          if (err.error.username) {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ error: err.message });
          }
        })
      );
  };
}
