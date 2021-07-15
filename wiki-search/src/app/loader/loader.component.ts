import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div
      class="block"
      style="display: flex; align-items: center; justify-content: center"
    >
      <div class="loader" style="font-size: 30px;"></div>
    </div>
  `,
  styles: [],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
