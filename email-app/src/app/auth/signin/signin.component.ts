import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  });
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSignupSubmit() {
    if (this.signinForm.invalid) {
      return;
    }
    // console.log(this.signinForm.value);
    this.authService.signin(this.signinForm.value).subscribe({
      next: () => {},
      error: ({ error }) => {
        if (error.username || error.password) {
          this.signinForm.setErrors({
            credentials: true,
          });
        } else {
          this.signinForm.setErrors({
            submitError: true,
          });
        }
      },
    });
  }
}
