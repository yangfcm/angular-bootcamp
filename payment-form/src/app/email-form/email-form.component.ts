import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  @ViewChild('emailForm', { static: true }) emailForm: NgForm;
  @ViewChild('emailControl') emailControl: NgModel;
  email = '';
  constructor() {}

  ngOnInit(): void {}

  onSubmitForm() {
    console.log(this.email);
  }
}
