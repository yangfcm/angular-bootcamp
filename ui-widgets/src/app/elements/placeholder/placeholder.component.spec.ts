import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimesDirective } from '../times.directive';
import { PlaceholderComponent } from './placeholder.component';

describe('PlaceholderComponent', () => {
  let component: PlaceholderComponent;
  let fixture: ComponentFixture<PlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceholderComponent, TimesDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header if header is set as true', () => {
    const header = fixture.debugElement.query(By.css('.header'));
    expect(header).toBeTruthy();
  });

  it('should not render header if header is false', () => {
    component.header = false;
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('.header'));
    expect(header).toBeFalsy();
  });

  it('should render a number of lines', () => {
    const lines = fixture.debugElement.queryAll(By.css('.paragraph .line'));
    expect(lines.length).toBe(component.lines);
  });
});
