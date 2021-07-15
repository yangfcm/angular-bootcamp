import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="notification is-danger">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class ErrorMessageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
