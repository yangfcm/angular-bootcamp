import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { SignoutComponent } from './signout.component';

describe('SignoutComponent', () => {
  let component: SignoutComponent;
  let fixture: ComponentFixture<SignoutComponent>;
  let signoutSpy;
  let authServiceStub, routerStub;

  beforeEach(async(() => {
    authServiceStub = jasmine.createSpyObj('AuthService', ['signout']);
    routerStub = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    signoutSpy = authServiceStub.signout.and.returnValue(of({}));
    TestBed.configureTestingModule({
      declarations: [SignoutComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
        {
          provide: Router,
          useValue: routerStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign out and navigate to signin page', () => {
    expect(authServiceStub.signout).toHaveBeenCalled();
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/signin');
  });
});
