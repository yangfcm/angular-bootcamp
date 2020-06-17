import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { WeatherModule } from './weather/weather.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NewsModule } from './news/news.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    WeatherModule,
    HttpClientModule,
    NotificationsModule,
    NewsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
