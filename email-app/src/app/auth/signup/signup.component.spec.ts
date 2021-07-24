import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceStub, routerStub, uniqueUsernameStub;
  let signupSpy, usernameAvailableSpy, validateSpy: any;
  let form: DebugElement,
    usernameInput: DebugElement,
    passwordInput: DebugElement,
    passwordConfInput: DebugElement,
    signupBtn: DebugElement;
  let usernameControl, passwordControl, passwordConfControl: any;

  beforeEach(async(() => {
    authServiceStub = jasmine.createSpyObj('AuthService', [
      'signup',
      'usernameAvailable',
    ]);
    usernameAvailableSpy = authServiceStub.usernameAvailable.and.returnValue(
      of(null)
    );

    uniqueUsernameStub = jasmine.createSpyObj('UniqueUsername', ['validate']);
    validateSpy = uniqueUsernameStub.validate.and.returnValue(of(null));

    routerStub = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: MatchPassword },
        { provide: UniqueUsername, useValue: uniqueUsernameStub },
      ],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    [usernameInput, passwordInput, passwordConfInput] =
      fixture.debugElement.queryAll(By.css('app-input'));
    form = fixture.debugElement.query(By.css('form'));
    signupBtn = fixture.debugElement.query(By.css('button'));
    usernameControl = component.signupForm.controls.username;
    passwordControl = component.signupForm.controls.password;
    passwordConfControl = component.signupForm.controls.passwordConf;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form and its elements', () => {
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(passwordConfInput).toBeTruthy();
    expect(form).toBeTruthy();
    expect(signupBtn).toBeTruthy();
  });

  it('should detect invalid input', () => {
    usernameControl.setValue('');
    passwordControl.setValue('');
    passwordConfControl.setValue('');
    fixture.detectChanges();
    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('should detect unmatched passwords', () => {
    usernameControl.setValue('John');
    passwordControl.setValue('password1');
    component.signupForm.get('password').markAsTouched();
    passwordConfControl.setValue('password2');
    component.signupForm.get('passwordConf').markAsTouched();
    fixture.detectChanges();
    expect(component.signupForm.invalid).toBeTruthy();
    const errorDiv = fixture.debugElement.query(By.css('div.red'));
    expect(errorDiv.nativeElement.innerText).toContain(
      'Passwords do not match'
    );
  });

  it('should submit form', () => {
    signupSpy = authServiceStub.signup.and.returnValue(
      of({
        username: 'John',
      })
    );
    usernameControl.setValue('John');
    passwordControl.setValue('password');
    passwordConfControl.setValue('password');
    form.triggerEventHandler('submit', null);
    expect(authServiceStub.signup).toHaveBeenCalledWith({
      username: 'John',
      password: 'password',
      passwordConf: 'password',
    });
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/inbox');
  });
});
