import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let randomTextParagraph: DebugElement,
    inputTextArea: DebugElement,
    successMessage: DebugElement,
    resetButton: DebugElement;
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
    randomTextParagraph = fixture.debugElement.query(By.css('p#random-text'));
    inputTextArea = fixture.debugElement.query(By.css('textarea#input-text'));
    successMessage = fixture.debugElement.query(By.css('div#success-message'));
    resetButton = fixture.debugElement.query(By.css('button#reset-button'));
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have random text and input text is empty initially', () => {
    expect(app.randomText).toBeTruthy();
    expect(app.inputText).toBe('');
    expect(app.isSuccess).toBe(false);
    expect(randomTextParagraph.nativeElement.innerText).toBe(app.randomText);
  });

  it('should respond to user input and use different colors to highlight correct/wrong input', () => {
    const text = 'lorem';
    app.randomText = text;
    inputTextArea.triggerEventHandler('input', {
      target: {
        value: 'lard',
      },
    });
    fixture.detectChanges();
    const letterSpans = fixture.debugElement.queryAll(
      By.css('p#random-text span')
    );
    expect(letterSpans[0].classes.correct).toBe(true);
    expect(letterSpans[0].classes.incorrect).toBeFalsy();
    expect(letterSpans[1].classes.correct).toBeFalsy();
    expect(letterSpans[1].classes.incorrect).toBe(true);
    expect(letterSpans[2].classes.correct).toBe(true);
    expect(letterSpans[2].classes.incorrect).toBeFalsy();
    expect(letterSpans[3].classes.correct).toBeFalsy();
    expect(letterSpans[3].classes.incorrect).toBe(true);
    expect(letterSpans[4].classes.correct).toBeFalsy();
    expect(letterSpans[4].classes.incorrect).toBeFalsy();
  });

  it('should show success message if input exactly matches random text', () => {
    expect(successMessage).toBeFalsy();
    const text = 'lorem';
    app.randomText = text;
    inputTextArea.triggerEventHandler('input', {
      target: {
        value: 'lorem',
      },
    });
    fixture.detectChanges();
    const displaySuccessMessage = fixture.debugElement.query(
      By.css('div#success-message')
    );
    expect(displaySuccessMessage).toBeTruthy();
    expect(displaySuccessMessage.nativeElement.innerText).toBe('Success!');
  });

  it('should clear input text and change random text when reset button is clicked', () => {
    const randomTextBefore = app.randomText;
    inputTextArea.triggerEventHandler('input', {
      target: {
        value: 'abcdefg',
      },
    });
    expect(app.inputText).toBe('abcdefg');
    resetButton.triggerEventHandler('click', null);
    expect(app.inputText).toBe('');

    const randomTextAfter = app.randomText;
    expect(randomTextAfter).toBeTruthy();
    expect(randomTextBefore === randomTextAfter).toBeFalse();
  });
});
