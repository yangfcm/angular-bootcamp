import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay } from 'rxjs/operators';
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

  ngOnInit(): void {
    /** statusChanges in reactive form is a subject object, which you can subscribe it
     * and watch its current value('INVALID' or 'VALID')
     */
    this.mathForm.statusChanges.pipe(delay(600)).subscribe((value) => {
      if (value === 'INVALID') {
        return;
      }
      this.mathForm.setValue({
        number1: this.generateRandomNumber(),
        number2: this.generateRandomNumber(),
        answer: '',
      });
    });
  }

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
