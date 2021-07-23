import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { defer, of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

import { SigninComponent } from './signin.component';

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authServiceStub, routerStub;
  let signinSpy;
  let form: DebugElement,
    usernameInput: DebugElement,
    passwordInput: DebugElement,
    signinBtn: DebugElement;
  let usernameControl, passwordControl: any;

  beforeEach(async(() => {
    authServiceStub = jasmine.createSpyObj('AuthService', ['signin']);
    routerStub = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
      ],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    [usernameInput, passwordInput] = fixture.debugElement.queryAll(
      By.css('app-input')
    );
    form = fixture.debugElement.query(By.css('form'));
    signinBtn = fixture.debugElement.query(By.css('button'));
    usernameControl = component.signinForm.controls.username;
    passwordControl = component.signinForm.controls.password;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form and its elements', () => {
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(form).toBeTruthy();
    expect(signinBtn).toBeTruthy();
  });

  it('should detect invalid input', () => {
    usernameControl.setValue('');
    passwordControl.setValue('');
    fixture.detectChanges();
    expect(component.signinForm.invalid).toBeTruthy();
  });

  it('should submit form', () => {
    usernameControl.setValue('John');
    passwordControl.setValue('abcde12345');
    expect(component.signinForm.valid).toBeTruthy();
    component.onSigninSubmit = jasmine.createSpy('onSigninSubmitSpy');
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(component.onSigninSubmit).toHaveBeenCalled();
  });

  it('should prompt bad credentials if username or password is wrong', () => {
    signinSpy = authServiceStub.signin.and.returnValue(
      throwError({ error: { password: 'Invalid password' } })
    );
    usernameControl.setValue('John');
    passwordControl.setValue('MyWrongPassword');
    expect(component.signinForm.errors).toBeFalsy();
    form.triggerEventHandler('submit', null);
    expect(authServiceStub.signin).toHaveBeenCalledWith({
      username: 'John',
      password: 'MyWrongPassword',
    });
    expect(component.signinForm.errors.credentials).toBeTruthy();
    fixture.detectChanges();
    const errorDiv = fixture.debugElement.query(By.css('div.red'));
    expect(errorDiv.nativeElement.innerText).toContain('Bad credentials');
  });

  it('should respond to valid signin', () => {
    signinSpy = authServiceStub.signin.and.returnValue(
      of({ username: 'John' })
    );
    usernameControl.setValue('John');
    passwordControl.setValue('MyRealPassword');
    form.triggerEventHandler('submit', null);
    expect(authServiceStub.signin).toHaveBeenCalledWith({
      username: 'John',
      password: 'MyRealPassword',
    });
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/inbox');
  });
});
