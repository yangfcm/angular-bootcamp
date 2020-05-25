import { Component } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    const numbers = '1234567890';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '`~!@#$%^&*()_-=+/?:;\'",.<>';
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
    const parsedValue = parseInt(e.target.value);
    if (
      !isNaN(parsedValue) &&
      parsedValue >= this.MIN_LENGTH &&
      parsedValue <= this.MAX_LENGTH
    ) {
      this.length = parsedValue;
    } else {
      this.length = 0;
    }
  }
}
