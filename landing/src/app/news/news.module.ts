import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldNewsArticlesComponent } from './world-news-articles/world-news-articles.component';

@NgModule({
  declarations: [WorldNewsArticlesComponent],
  imports: [CommonModule],
  exports: [WorldNewsArticlesComponent],
})
export class NewsModule {}
