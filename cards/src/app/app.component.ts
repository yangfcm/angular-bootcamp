import { Component } from '@angular/core';

export const postsData = [
  {
    imageUrl: 'assets/tree.jpg',
    title: 'Neat Tree',
    username: 'nature',
    content: 'Saw this awesome tree during my hike today.',
  },
  {
    imageUrl: 'assets/mountain.jpg',
    title: 'Snowy Mountain',
    username: 'mountainlover',
    content: 'Here is a picture of a snowy mountain',
  },
  {
    imageUrl: 'assets/bike.jpg',
    title: 'Mountain Biking',
    username: 'biker',
    content: 'I did some biking today.',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cards';
  posts = postsData;
}
