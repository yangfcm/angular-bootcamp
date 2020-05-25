import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
    if (!isNaN(parsedValue)) {
      this.length = parsedValue;
    } else {
      this.length = 0;
    }
  }
}
