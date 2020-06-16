import { Component, OnInit } from '@angular/core';
import {
  NotificationsService,
  ICommand,
  CommandType,
} from '../notifications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  messages: Observable<ICommand[]>;
  CommandType = CommandType;

  constructor(private notificationsService: NotificationsService) {
    this.messages = notificationsService.messagesOutput;

    // setInterval(() => {
    //   notificationsService.addSuccess('working...');
    // }, 1000);
  }

  ngOnInit(): void {}

  onClose(id: number) {
    this.notificationsService.clearMessage(id);
  }
}
