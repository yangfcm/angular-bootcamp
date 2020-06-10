import { Component, OnInit } from '@angular/core';
import { IEmail } from '../email.interface';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: IEmail;
  constructor() {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: 'test@angular-email.com',
    };
  }

  ngOnInit(): void {}
}
