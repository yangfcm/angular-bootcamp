import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

export interface Page {
  pageid: number;
  title: string;
  snippet: string;
  wordcount: number;
}

export interface WikiResponse {
  query: {
    search: Page[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class WikiService {
  apiUrl = 'https://en.wikipedia.org/w/api.php';
  // isLoading = false;
  // error = '';
  // pages: Page[] = [];

  constructor(private http: HttpClient) {}

  // public search(term: string) {
  //   this.isLoading = true;
  //   this.error = '';
  //   this.pages = [];
  //   return this.http
  //     .get<WikiResponse>(`${this.apiUrl}`, {
  //       params: {
  //         action: 'query',
  //         format: 'json',
  //         list: 'search',
  //         utf8: '1',
  //         srsearch: term,
  //         origin: '*',
  //       },
  //     })
  //     .pipe(pluck('query', 'search'))
  //     .subscribe(
  //       (data: Page[]) => {
  //         this.pages = data;
  //         this.error = '';
  //       },
  //       (error: HttpErrorResponse) => {
  //         this.error = error.message;
  //         this.pages = [];
  //       },
  //       () => {
  //         this.isLoading = false;
  //       }
  //     );
  // }

  public search(term: string) {
    return this.http
      .get<WikiResponse>(`${this.apiUrl}`, {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          utf8: '1',
          srsearch: term,
          origin: '*',
        },
      })
      .pipe(pluck('query', 'search'));
  }
}
