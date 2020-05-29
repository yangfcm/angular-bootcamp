import { Component } from '@angular/core';
import { WikiService } from './wiki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'wiki-search';
  pages = [];

  constructor(private wiki: WikiService) {}

  onTermSubmitted(term: string) {
    this.wiki.search(term).subscribe((response: any) => {
      this.pages = response.query.search;
    });
  }
}
