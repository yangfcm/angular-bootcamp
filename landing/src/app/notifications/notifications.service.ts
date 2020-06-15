import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

enum CommandType {
  success = 'success',
  error = 'error',
  clear = 'clear',
}

interface ICommand {
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
    this.messagesInput.next({
      id: this.randomId(),
      type: CommandType.success,
      text: message,
    });
  }

  addError(message: string) {
    this.messagesInput.next({
      id: this.randomId(),
      type: CommandType.error,
      text: message,
    });
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
