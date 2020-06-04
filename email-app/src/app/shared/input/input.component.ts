import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() control: FormControl;
  constructor() {}

  ngOnInit(): void {}

  showErrors() {
    console.log(this.control);
    if (!this.control) {
      return false;
    }
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
