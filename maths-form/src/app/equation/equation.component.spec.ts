import { DebugElement } from '@angular/core';
import {
  async,
  fakeAsync,
  ComponentFixture,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { EquationComponent } from './equation.component';

describe('EquationComponent', () => {
  let component: EquationComponent;
  let fixture: ComponentFixture<EquationComponent>;
  let answerInput: DebugElement, equationDiv: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EquationComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquationComponent);
    component = fixture.componentInstance;
    answerInput = fixture.debugElement.query(By.css('input'));
    equationDiv = fixture.debugElement.query(By.css('.equation'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render answer input, equationDiv', () => {
    expect(answerInput).toBeTruthy();
    expect(equationDiv).toBeTruthy();
  });

  it('should render initial number1 and number2', () => {
    expect(equationDiv.nativeElement.innerText).toContain(component.number1);
    expect(equationDiv.nativeElement.innerText).toContain(component.number2);
  });

  it('should have getters number1 and number2 whose values are from mathForm', () => {
    expect(component.number1).toBe(component.mathForm.controls.number1.value);
    expect(component.number2).toBe(component.mathForm.controls.number2.value);
  });

  it('should respond to correct answer provided and calculate how many seconds on average for a correct answer', fakeAsync(() => {
    expect(component.secondsPerSolution).toBe(0);
    tick(1000); // Wait for 1s
    answerInput.triggerEventHandler('input', {
      target: {
        value: component.number1 + component.number2,
      },
    });
    fixture.detectChanges();
    tick(400); // Wait for 400ms to let component rersponds to the correct answer provided.

    expect(component.secondsPerSolution.toFixed(2)).toBe((1.4).toFixed(2)); // Round 2 digits to avoid the inaccuracy of float number.

    tick(2000);
    answerInput.triggerEventHandler('input', {
      target: {
        value: component.number1 + component.number2,
      },
    });
    fixture.detectChanges();
    tick(400);
    expect(component.secondsPerSolution.toFixed(2)).toBe((1.9).toFixed(2)); // (1000+400+2000+400)/2 = 1.9
  }));
});
