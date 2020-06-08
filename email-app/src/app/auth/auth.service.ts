import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface SignupCredentials {
  username: string;
  password: string;
  passwordConf: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = environment.apiUrl;
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    // console.log(credentials);
    return this.http
      .post<SignupResponse>(
        `${this.rootUrl}/auth/signup`,
        {
          username: credentials.username,
          password: credentials.password,
          passwordConfirmation: credentials.passwordConf,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http
      .get(`${this.rootUrl}/auth/signedin`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }
}
