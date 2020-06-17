import { Component, OnInit } from '@angular/core';
import { NewsService, IArticle } from '../news.service';

@Component({
  selector: 'app-world-news-articles',
  templateUrl: './world-news-articles.component.html',
  styleUrls: ['./world-news-articles.component.css'],
})
export class WorldNewsArticlesComponent implements OnInit {
  articles: IArticle[];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.pagesOutput.subscribe((articles) => {
      this.articles = articles;
    });
    this.newsService.getPage(1);
  }
}
