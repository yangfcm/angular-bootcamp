import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WikiService {
  apiUrl = 'https://en.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  public search(term: string) {
    return this.http.get(`${this.apiUrl}`, {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*',
      },
    });
  }
}
