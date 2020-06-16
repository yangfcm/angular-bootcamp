import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

export enum CommandType {
  success = 'success',
  error = 'error',
  clear = 'clear',
}

export interface ICommand {
  id: number;
  type: CommandType;
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<ICommand>;
  messagesOutput: Observable<ICommand[]>;
  constructor() {
    this.messagesInput = new Subject<ICommand>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: ICommand[], value: ICommand) => {
        if (value.type === CommandType.clear) {
          return acc.filter((message) => message.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }

  addSuccess(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      type: CommandType.success,
      text: message,
    });

    // Clear the message automatically after a time-out
    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      type: CommandType.error,
      text: message,
    });

    // Clear the message automatically after a time-out
    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: CommandType.clear,
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
