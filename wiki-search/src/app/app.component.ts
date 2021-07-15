import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Page, WikiService } from './wiki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoading = false;
  pages: Page[] = [];
  error = '';

  constructor(private wiki: WikiService) {}

  onTermSubmitted(term: string) {
    this.isLoading = true;
    this.error = '';
    this.pages = [];
    this.wiki.search(term).subscribe(
      (data: Page[]) => {
        this.pages = data;
        this.error = '';
      },
      (error: HttpErrorResponse) => {
        this.error = error.message;
        this.pages = [];
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
