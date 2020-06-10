import { Component, OnInit } from '@angular/core';
import { IEmail } from '../email.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: IEmail;
  constructor(private authService: AuthService) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authService.username}@angular-email.com`,
    };
  }

  ngOnInit(): void {}
}
