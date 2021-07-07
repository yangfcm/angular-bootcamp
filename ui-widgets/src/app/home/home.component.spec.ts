import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    const h1El = fixture.debugElement.query(By.css('h1'));
    const h2El = fixture.debugElement.query(By.css('h2'));
    expect(h1El.nativeElement.innerText).toContain('Components Demonstration');
    expect(h2El.nativeElement.innerText).toContain(
      'SHOW HOW TO USE ANGULAR COMPONENTS'
    );
  });
});
