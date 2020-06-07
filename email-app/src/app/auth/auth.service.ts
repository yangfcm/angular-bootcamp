import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    console.log(credentials);
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, {
      username: credentials.username,
      password: credentials.password,
      passwordConfirmation: credentials.passwordConf,
    });
  }
}
