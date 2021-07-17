import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AnswerHighlightDirective } from './answer-highlight.directive';

@Component({
  template: ` <form [formGroup]="mathForm">
    <div class="equation">{{ number1 }} + {{ number2 }}</div>
    <input formControlName="answer" appAnswerHighlight />
  </form>`,
})
class TestComponent {
  mathForm = new FormGroup({
    number1: new FormControl(3),
    number2: new FormControl(5),
    answer: new FormControl(''),
  });
}

describe('AnswerHighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let answerInput: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, AnswerHighlightDirective],
      imports: [ReactiveFormsModule],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    answerInput = fixture.debugElement.query(
      By.directive(AnswerHighlightDirective)
    );
    fixture.detectChanges();
  });

  it('should have correct class applied to answer if answer = number1 + number2', () => {
    answerInput.triggerEventHandler('input', {
      target: {
        value: 8,
      },
    });
    fixture.detectChanges();
    expect(answerInput.nativeElement.className).toContain('correct');
    expect(answerInput.nativeElement.className).not.toContain('close');
  });

  it('should have close class applied to answer if answer is not equal to but close to number1 + number2', () => {
    answerInput.triggerEventHandler('input', {
      target: {
        value: 9,
      },
    });
    fixture.detectChanges();
    expect(answerInput.nativeElement.className).toContain('close');
    expect(answerInput.nativeElement.className).not.toContain('correct');
  });

  it('should not have correct or close class if answer is far from number1 + number2', () => {
    answerInput.triggerEventHandler('input', {
      target: {
        value: 99,
      },
    });
    fixture.detectChanges();
    expect(answerInput.nativeElement.className).not.toContain('close');
    expect(answerInput.nativeElement.className).not.toContain('correct');
  });
});
