import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-views-home',
  templateUrl: './views-home.component.html',
  styleUrls: ['./views-home.component.css'],
})
export class ViewsHomeComponent implements OnInit {
  stats = [
    { value: 22, label: 'Favs' },
    { value: '31,200', label: 'Views' },
    { value: 598, label: 'Members' },
  ];

  items = [
    {
      image: '/assets/bike.jpg',
      title: 'Bike',
      description: 'A beautiful bike',
    },
    {
      image: '/assets/mountain.jpg',
      title: 'Mountain',
      description: 'A high mountain',
    },
    {
      image: '/assets/tree.jpg',
      title: 'Tree',
      description: 'A big tree',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
