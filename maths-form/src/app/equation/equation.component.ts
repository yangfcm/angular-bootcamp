import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      number1: new FormControl(this.generateRandomNumber()),
      number2: new FormControl(this.generateRandomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('number1', 'number2', 'answer')]
  );

  constructor() {}

  ngOnInit(): void {}

  generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  get number1() {
    return this.mathForm.value.number1;
  }
  get number2() {
    return this.mathForm.value.number2;
  }
}
