import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  // weatherData = [];
  weather$: Observable<{ date: string; temp: number }[]>;

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    // this.forecastService.getForecast().subscribe((weatherData) => {
    //   // console.log('ok,', weatherData);
    //   this.weatherData = weatherData;
    // });
    this.weather$ = this.forecastService.getForecast();
  }
}
