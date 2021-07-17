import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let input: DebugElement, error: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.label = 'nickname';
    component.control = new FormControl('init value', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
      Validators.pattern(/a-zA-Z0-9/),
    ]);
    input = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input control with initial values and not render error message', () => {
    expect(input).toBeTruthy();
    expect(input.nativeElement.value).toBe('init value');
    error = fixture.debugElement.query(By.css('.help'));
    expect(error).toBeFalsy();
  });

  it('should update the control with new input', () => {
    input.triggerEventHandler('input', {
      target: {
        value: 'new value',
      },
    });
    fixture.detectChanges();
    expect(component.control.value).toBe('new value');
    error = fixture.debugElement.query(By.css('.help'));
    expect(error).toBeFalsy();
  });

  it('should render required error if no value provided', () => {
    input.triggerEventHandler('input', {
      target: {
        value: '',
      },
    });
    component.control.markAsTouched();
    component.control.markAsDirty();

    fixture.detectChanges();
    expect(component.showErrors()).toBeTruthy();
    error = fixture.debugElement.query(By.css('.help'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.innerText).toContain(
      `${component.label} is required`
    );
  });

  it('should render min length error if a value less than required min length is provided', () => {
    input.triggerEventHandler('input', {
      target: {
        value: 'a',
      },
    });
    component.control.markAsTouched();
    component.control.markAsDirty();

    fixture.detectChanges();
    expect(component.showErrors()).toBeTruthy();
    error = fixture.debugElement.query(By.css('.help'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.innerText).toContain(
      `${component.label} must be at least 4 characters`
    );
  });

  it('should render min length error if a value more than required max length is provided', () => {
    input.triggerEventHandler('input', {
      target: {
        value: 'abcdefghij1234567890',
      },
    });
    component.control.markAsTouched();
    component.control.markAsDirty();

    fixture.detectChanges();
    expect(component.showErrors()).toBeTruthy();
    error = fixture.debugElement.query(By.css('.help'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.innerText).toContain(
      `${component.label} must not exceed 15 characters`
    );
  });

  it('should render invalid error if an invalid value is provided', () => {
    input.triggerEventHandler('input', {
      target: {
        value: 'abc#%/',
      },
    });
    component.control.markAsTouched();
    component.control.markAsDirty();

    fixture.detectChanges();
    expect(component.showErrors()).toBeTruthy();
    error = fixture.debugElement.query(By.css('.help'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.innerText).toContain(
      `The format of ${component.label} is invalid`
    );
  });
});
