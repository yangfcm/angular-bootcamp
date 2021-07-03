import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// helper functions for test
function setLengthInput(input: DebugElement, value: string): void {
  input.triggerEventHandler('input', {
    target: {
      value,
    },
  });
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have correct initial state', () => {
    expect(app.MAX_LENGTH).toBe(20);
    expect(app.MIN_LENGTH).toBe(6);
    expect(app.password).toBe('');
    expect(app.length).toBe(0);
    expect(app.useLetters).toBeFalse();
    expect(app.useNumbers).toBeFalse();
    expect(app.useSymbols).toBeFalse();
  });

  it('should have form for length input and parse the input from user', () => {
    const lengthInput = fixture.debugElement.query(
      By.css('input#length-input')
    );
    expect(lengthInput).toBeTruthy();
    setLengthInput(lengthInput, '12');
    expect(app.length).toBe(12);
    setLengthInput(lengthInput, '8.8');
    expect(app.length).toBe(8);
  });

  it('length should be 0 if user inputs values other than number or a number less than MIN_LENGTH or more than MAX_LENGTH', () => {
    const lengthInput = fixture.debugElement.query(
      By.css('input#length-input')
    );
    setLengthInput(lengthInput, '12b');
    expect(app.length).toBe(0);

    setLengthInput(lengthInput, '5');
    expect(app.length).toBe(0);

    setLengthInput(lengthInput, '21');
    expect(app.length).toBe(0);
  });
});
