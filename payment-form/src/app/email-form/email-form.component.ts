import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  email = '';
  constructor() {}

  ngOnInit(): void {}

  onSubmitForm() {
    console.log(this.email);
  }
}
