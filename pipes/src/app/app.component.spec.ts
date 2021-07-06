import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ConvertPipe } from './convert.pipe';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let payeeNameInput: DebugElement,
    convertedPayeeName: DebugElement,
    dateInput: DebugElement,
    convertedDate: DebugElement,
    amountInput: DebugElement,
    convertedAmount: DebugElement,
    milesInput: DebugElement,
    convertedMiles: DebugElement,
    convertedJson: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ConvertPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    payeeNameInput = fixture.debugElement.query(
      By.css('input#payee-name-input')
    );
    convertedPayeeName = fixture.debugElement.query(
      By.css('#converted-payee-name')
    );
    dateInput = fixture.debugElement.query(By.css('input#date-input'));
    convertedDate = fixture.debugElement.query(By.css('#converted-date'));
    amountInput = fixture.debugElement.query(By.css('input#amount-input'));
    convertedAmount = fixture.debugElement.query(By.css('#converted-amount'));
    milesInput = fixture.debugElement.query(By.css('input#miles-input'));
    convertedMiles = fixture.debugElement.query(By.css('#converted-miles'));
    convertedJson = fixture.debugElement.query(By.css('#converted-json'));
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should convert name on input', () => {
    payeeNameInput.triggerEventHandler('input', {
      target: {
        value: 'john doe',
      },
    });
    fixture.detectChanges();
    expect(convertedPayeeName.nativeElement.innerText).toBe('John Doe');
  });

  it('should convert date on input', () => {
    dateInput.triggerEventHandler('input', {
      target: {
        value: '07/22/2021',
      },
    });
    fixture.detectChanges();
    expect(convertedDate.nativeElement.innerText).toBe('22 July, 2021');
  });

  it('should convert amount on input', () => {
    amountInput.triggerEventHandler('input', {
      target: {
        value: '12345.67',
      },
    });
    fixture.detectChanges();
    expect(convertedAmount.nativeElement.innerText).toBe('A$12,345.67');
  });

  it('should convert miles to kilometers on input', () => {
    milesInput.triggerEventHandler('input', {
      target: {
        value: '234',
      },
    });
    fixture.detectChanges();
    expect(convertedMiles.nativeElement.innerText).toBe('376.59');
  });

  it('should convert plain object to json', () => {
    app.car = {
      make: 'Audi',
      model: 'A6',
      year: '2020',
    };
    fixture.detectChanges();
    expect(convertedJson.nativeElement.innerText).toBe(
      '{ "make": "Audi", "model": "A6", "year": "2020" }'
    );
  });
});
