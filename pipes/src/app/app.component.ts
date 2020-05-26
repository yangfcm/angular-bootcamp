import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pipes';
  name: string;
  date: string;
  amount: number;
  miles: number;

  car = {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
  };

  onNameChange(value: string) {
    this.name = value;
  }
  onDateChange(value: string) {
    this.date = value;
  }
  onAmountChange(value: string) {
    this.amount = parseFloat(value);
  }
  onMilesChange(value: string) {
    this.miles = parseFloat(value);
  }
}
