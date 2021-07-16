import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.cardNumber = '1234567890';
    component.name = 'JOHN';
    component.expiration = '12/21';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render card number', () => {
    const cardNumberEl = fixture.debugElement.query(By.css('text#svgnumber'));
    expect(cardNumberEl.nativeElement.textContent).toContain('1234567890');
  });

  it('should render name', () => {
    const nameEl = fixture.debugElement.query(By.css('text#svgname'));
    expect(nameEl.nativeElement.textContent).toContain('JOHN');
  });

  it('should render expire', () => {
    const expireEl = fixture.debugElement.query(By.css('text#svgexpire'));
    expect(expireEl.nativeElement.textContent).toContain('12/21');
  });
});
