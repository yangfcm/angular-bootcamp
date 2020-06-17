import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  @Input() numberOfPages: number;
  currentPage = 1;
  pageOptions: number[];

  constructor() {}

  ngOnInit(): void {
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter(
      (pageNumber) => pageNumber >= 1 && pageNumber <= this.numberOfPages
    );
  }
}
