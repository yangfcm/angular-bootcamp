import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let input: DebugElement, error: DebugElement;

  function basicSetting() {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  }

  describe('Basic Text InputComponent', () => {
    beforeEach(() => {
      basicSetting();
      component.label = 'username';
      component.type = 'text';
      component.control = new FormControl('user', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render text input', () => {
      input = fixture.debugElement.query(By.css('input'));
      expect(input).toBeTruthy();
    });

    it('should update the control with new input', () => {
      input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('input', {
        target: {
          value: 'John',
        },
      });
      fixture.detectChanges();
      expect(component.control.value).toBe('John');
      error = fixture.debugElement.query(By.css('div.red'));
      expect(error).toBeFalsy();
    });

    it('should render error if invalid value is provided', () => {
      input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('input', {
        target: {
          value: '',
        },
      });
      component.control.markAsDirty();
      component.control.markAsTouched();
      fixture.detectChanges();
      error = fixture.debugElement.query(By.css('div.red'));

      expect(component.control.errors.required).toBeTruthy();
      expect(error.nativeElement.innerText).toContain('This field is required');

      input.triggerEventHandler('input', {
        target: {
          value: 'Jo',
        },
      });
      fixture.detectChanges();
      expect(component.control.errors.minlength).toBeTruthy();
      expect(error.nativeElement.innerText).toContain(`Value must be at least`);

      input.triggerEventHandler('input', {
        target: {
          value: 'veryverylongname',
        },
      });
      fixture.detectChanges();
      expect(component.control.errors.maxlength).toBeTruthy();
      expect(error.nativeElement.innerText).toContain(`Value must not exceed`);

      input.triggerEventHandler('input', {
        target: {
          value: 'John+',
        },
      });
      fixture.detectChanges();
      expect(component.control.errors.pattern).toBeTruthy();
      expect(error.nativeElement.innerText).toContain(
        `Value has invalid characters`
      );

      component.control.setErrors({
        nonUniqueUsername: true,
      });
      fixture.detectChanges();
      expect(error.nativeElement.innerText).toContain('Username is taken');
    });
  });

  describe('Basic Textarea InputComponent', () => {
    beforeEach(() => {
      basicSetting();
      component.label = 'content';
      component.controlType = 'textarea';
      component.control = new FormControl('...');

      input = fixture.debugElement.query(By.css('textarea'));
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render textarea', () => {
      input = fixture.debugElement.query(By.css('textarea'));
      expect(input).toBeTruthy();
    });

    it('should update the control value with new input', () => {
      input = fixture.debugElement.query(By.css('textarea'));
      input.triggerEventHandler('input', {
        target: {
          value: 'Something',
        },
      });
      expect(component.control.value).toBe('Something');
    });
  });
});
