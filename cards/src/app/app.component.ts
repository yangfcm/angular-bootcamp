import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cards';
  posts = [
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
}
