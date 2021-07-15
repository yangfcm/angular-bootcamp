import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../wiki.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {
  @Input() pages: Page[] = [];
  constructor() {}

  ngOnInit(): void {}
}
