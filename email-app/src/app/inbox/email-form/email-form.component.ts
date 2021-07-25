import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEmail } from '../email.interface';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  @Input() email: IEmail;
  @Output() emailSubmit = new EventEmitter();
  emailForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const { subject, from, to, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      console.log('invalid form');
      return;
    }
    // console.log(this.emailForm.value);
    this.emailSubmit.emit(this.emailForm.value);
  }
}
