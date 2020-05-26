import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentIndex = 3;
  images = [
    {
      title: 'Aerial view of city during daytime',
      imageUrl:
        'https://images.unsplash.com/photo-1590398096332-d2bb67962c91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Red Audi r8 on dirt road',
      imageUrl:
        'https://images.unsplash.com/photo-1590363719229-25b5e87b8983?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: '2 men walking on beach during daytime',
      imageUrl:
        'https://images.unsplash.com/photo-1590374584403-6e9673571c59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Time lapse photography of stars above the sky during night time',
      imageUrl:
        'https://images.unsplash.com/photo-1590412476917-c87f377c2f53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
  ];
}
