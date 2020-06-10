import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IEmail } from '../email.interface';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit, OnChanges {
  showModal = false;
  @Input() email: IEmail;

  constructor(private emailService: EmailService) {}
  ngOnInit(): void {}
  ngOnChanges(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------------- ${this.email.from} wrote:\n>${this.email.text}`,
    };
  }

  onSendEmail(email: IEmail) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
