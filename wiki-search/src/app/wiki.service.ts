import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

interface WikiResponse {
  query: {
    search: {
      pageid: number;
      title: string;
      snippet: string;
    }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class WikiService {
  apiUrl = 'https://en.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

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
