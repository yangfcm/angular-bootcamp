import { Component } from '@angular/core';

export const numbers = '1234567890';
export const letters = 'abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ';
export const symbols = '`~!@#$%^&*()_-=+/?:;\'",.<>';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  MIN_LENGTH = 6;
  MAX_LENGTH = 20;
  password = '';
  length = 0;
  useLetters = false;
  useNumbers = false;
  useSymbols = false;

  handleGeneratePassword() {
    let validChars = '';
    let generatedPassword = '';
    if (this.useLetters) {
      validChars += letters;
    }
    if (this.useNumbers) {
      validChars += numbers;
    }
    if (this.useSymbols) {
      validChars += symbols;
    }

    for (let i = 0; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[randomIndex];
    }

    this.password = generatedPassword;
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

  handleLengthInput(e) {
    const numberValue = Number(e.target.value);
    if (
      isNaN(numberValue) ||
      numberValue < this.MIN_LENGTH ||
      numberValue > this.MAX_LENGTH
    )
      return;
    this.length = Math.floor(numberValue);
  }
}
