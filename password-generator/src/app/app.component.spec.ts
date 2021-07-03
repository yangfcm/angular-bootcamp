import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent, numbers, letters, symbols } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let lengthInput: DebugElement,
    useLettersCheckBox: DebugElement,
    useNumbersCheckBox: DebugElement,
    useSymbolsCheckBox: DebugElement,
    generatePasswordBtn: DebugElement,
    generatedPasswordContainer: DebugElement,
    generatedPasswordInput: DebugElement;

  // helper functions for test
  function setLengthInput(input: DebugElement, value: string): void {
    input.triggerEventHandler('input', {
      target: {
        value,
      },
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    lengthInput = fixture.debugElement.query(By.css('input#length-input'));
    useLettersCheckBox = fixture.debugElement.query(
      By.css('input#use-letters')
    );
    useNumbersCheckBox = fixture.debugElement.query(
      By.css('input#use-numbers')
    );
    useSymbolsCheckBox = fixture.debugElement.query(
      By.css('input#use-symbols')
    );

    generatePasswordBtn = fixture.debugElement.query(
      By.css('button#generate-password-btn')
    );
    generatedPasswordContainer = fixture.debugElement.query(
      By.css('div#password-container')
    );
    generatedPasswordInput = fixture.debugElement.query(
      By.css('input#password-generated')
    );
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have expected initial state', () => {
    fixture.detectChanges();
    expect(app.MAX_LENGTH).toBe(20);
    expect(app.MIN_LENGTH).toBe(6);
    expect(app.password).toBe('');
    expect(app.length).toBe(0);
    expect(app.useLetters).toBeFalse();
    expect(app.useNumbers).toBeFalse();
    expect(app.useSymbols).toBeFalse();
    expect(generatedPasswordContainer).toBeFalsy();
    expect(generatedPasswordInput).toBeFalsy();
    expect(generatePasswordBtn.nativeElement.disabled).toBeTrue();
  });

  it('should have form for length input and parse the input from user', () => {
    expect(lengthInput).toBeTruthy();
    setLengthInput(lengthInput, '12');
    expect(app.length).toBe(12);
    setLengthInput(lengthInput, '8.8');
    expect(app.length).toBe(8);
  });

  it('length should be 0 if user inputs values other than number or a number less than MIN_LENGTH or more than MAX_LENGTH', () => {
    setLengthInput(lengthInput, '12b');
    expect(app.length).toBe(0);

    setLengthInput(lengthInput, '5');
    expect(app.length).toBe(0);

    setLengthInput(lengthInput, '21');
    expect(app.length).toBe(0);
  });

  it('should toggle use letters checkbox', () => {
    useLettersCheckBox.triggerEventHandler('change', null);
    expect(app.useLetters).toBeTrue();
    useLettersCheckBox.triggerEventHandler('change', null);
    expect(app.useLetters).toBeFalse();
  });

  it('should toggle use numbers checkbox', () => {
    useNumbersCheckBox.triggerEventHandler('change', null);
    expect(app.useNumbers).toBeTrue();
    useNumbersCheckBox.triggerEventHandler('change', null);
    expect(app.useNumbers).toBeFalse();
  });

  it('should toggle use symbols checkbox', () => {
    useSymbolsCheckBox.triggerEventHandler('change', null);
    expect(app.useSymbols).toBeTrue();
    useSymbolsCheckBox.triggerEventHandler('change', null);
    expect(app.useSymbols).toBeFalse();
  });

  it('should enable generate button if valid password length is provided and one of checkboxes is checked', () => {
    setLengthInput(lengthInput, '7');
    useLettersCheckBox.triggerEventHandler('change', null);
    expect(generatePasswordBtn.nativeElement.disabled).toBeFalse();
  });

  it('should generate proper password with specified lengh and only letters', () => {
    setLengthInput(lengthInput, '18');
    useLettersCheckBox.triggerEventHandler('change', null);
    generatePasswordBtn.triggerEventHandler('click', null);
    expect(app.password.length).toBe(18);

    let allLetters = true;
    for (let ch of app.password) {
      if (!letters.includes(ch)) allLetters = false;
    }
    expect(allLetters).toBeTrue();

    fixture.detectChanges();
    generatedPasswordInput = fixture.debugElement.query(
      By.css('input#password-generated')
    );
    expect(generatedPasswordInput.nativeElement.value).toBe(app.password);
  });

  it('should generate proper password with specified length and only numbers', () => {
    setLengthInput(lengthInput, '19');
    useNumbersCheckBox.triggerEventHandler('change', null);
    generatePasswordBtn.triggerEventHandler('click', null);
    expect(app.password.length).toBe(19);

    let allNumbers = true;
    for (let ch of app.password) {
      if (!numbers.includes(ch)) allNumbers = false;
    }
    expect(allNumbers).toBeTrue();

    fixture.detectChanges();
    generatedPasswordInput = fixture.debugElement.query(
      By.css('input#password-generated')
    );
    expect(generatedPasswordInput.nativeElement.value).toBe(app.password);
  });

  it('should generate proper password with specified length and only symbols', () => {
    setLengthInput(lengthInput, '20');
    useSymbolsCheckBox.triggerEventHandler('change', null);
    generatePasswordBtn.triggerEventHandler('click', null);
    expect(app.password.length).toBe(20);

    let allSymbols = true;
    for (let ch of app.password) {
      if (!symbols.includes(ch)) allSymbols = false;
    }
    expect(allSymbols).toBeTrue();

    fixture.detectChanges();
    generatedPasswordInput = fixture.debugElement.query(
      By.css('input#password-generated')
    );
    expect(generatedPasswordInput.nativeElement.value).toBe(app.password);
  });

  it('should generate proper password with specified length and with letters, numbers and symbols', () => {
    setLengthInput(lengthInput, '20');
    useLettersCheckBox.triggerEventHandler('change', null);
    useNumbersCheckBox.triggerEventHandler('change', null);
    useSymbolsCheckBox.triggerEventHandler('change', null);
    generatePasswordBtn.triggerEventHandler('click', null);
    expect(app.password.length).toBe(20);

    const validChars = letters + numbers + symbols;
    let allValidChars = true;
    for (let ch of app.password) {
      if (!validChars.includes(ch)) allValidChars = false;
    }
    expect(allValidChars).toBeTrue();

    fixture.detectChanges();
    generatedPasswordInput = fixture.debugElement.query(
      By.css('input#password-generated')
    );
    expect(generatedPasswordInput.nativeElement.value).toBe(app.password);
  });
});
