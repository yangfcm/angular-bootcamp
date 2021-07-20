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

      input = fixture.debugElement.query(By.css('input'));
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Basic Textarea IinputComponent', () => {
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
  });
});
