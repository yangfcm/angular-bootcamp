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

interface SigninCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = environment.apiUrl;
  signedIn$ = new BehaviorSubject(null);
  username = '';

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
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, {
        username: credentials.username,
        password: credentials.password,
        passwordConfirmation: credentials.passwordConf,
      })
      .pipe(
        tap(({ username }) => {
          this.signedIn$.next(true);
          this.username = username;
        })
      );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SignedInResponse>(`${this.rootUrl}/auth/signin`, {
        username: credentials.username,
        password: credentials.password,
      })
      .pipe(
        tap(({ username }) => {
          this.signedIn$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedInResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedIn$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
        this.username = '';
      })
    );
  }
}
