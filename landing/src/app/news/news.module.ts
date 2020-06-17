import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldNewsArticlesComponent } from './world-news-articles/world-news-articles.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WorldNewsArticlesComponent],
  imports: [CommonModule, SharedModule],
  exports: [WorldNewsArticlesComponent],
})
export class NewsModule {}
