import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
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
    const startTime = new Date();
    let numberSolved = 0;

    /** statusChanges in reactive form is a subject object, which you can subscribe it
     * and watch its current value('INVALID' or 'VALID')
     */
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(400)
      )
      .subscribe(() => {
        numberSolved++;
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
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
