import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getForecast().subscribe((weatherData) => {
      console.log(weatherData);
    });
  }
}
