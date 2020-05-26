import { Component } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  randomText = lorem.text();
  inputText = '';
  isSuccess = false;

  handleInput(value: string) {
    this.inputText = value;
    if (this.inputText === this.randomText) {
      this.isSuccess = true;
    } else {
      this.isSuccess = false;
    }
  }

  handleResetGame() {
    this.randomText = lorem.text();
    this.inputText = '';
    this.isSuccess = false;
  }
}
