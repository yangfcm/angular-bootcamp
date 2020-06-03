import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
  constructor(private el: ElementRef, private controlName: NgControl) {}

  ngOnInit() {
    /** Apply different colors/styles according the answer input by user */
    this.controlName.control.parent.valueChanges
      .pipe(
        map(
          ({ number1, number2, answer }) =>
            Math.abs(number1 + number2 - answer) / (number1 + number2)
        )
      )
      .subscribe((value) => {
        if (value === 0) {
          this.el.nativeElement.classList.add('correct');
        } else {
          this.el.nativeElement.classList.remove('correct');

          if (value < 0.2) {
            this.el.nativeElement.classList.add('close');
          } else {
            this.el.nativeElement.classList.remove('close');
          }
        }
      });
  }
}
