import { Component } from '@angular/core';
import { WikiService } from './wiki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  _wiki: WikiService;

  constructor(private wiki: WikiService) {
    this._wiki = wiki;
  }

  onTermSubmitted(term: string) {
    this.wiki.search(term);
  }
}
