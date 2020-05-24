import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  password = '';
  useLetters = false;
  useNumbers = false;
  useSymbols = false;

  handleGeneratePassword() {
    this.password = 'my password';
    console.log(this.useLetters);
  }

  handleChangeUseLetters() {
    this.useLetters = !this.useLetters;
  }
  handleChangeUseNumbers() {
    this.useNumbers = !this.useNumbers;
  }
  handleChangeUseSymbols() {
    this.useSymbols = !this.useSymbols;
  }
}
