import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'email-app';
  signedIn = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.signedIn$.subscribe((signedIn) => {
      this.signedIn = signedIn;
    });
    this.authService.checkAuth().subscribe(() => {});
  }
}
