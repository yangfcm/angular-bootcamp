import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let form: DebugElement, input: DebugElement;
  let preventDefaultSpy: jasmine.Spy<jasmine.Func>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    form = fixture.debugElement.query(By.css('form'));
    input = fixture.debugElement.query(By.css('input'));
    preventDefaultSpy = jasmine.createSpy('preventDefaultSpy');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form and input', () => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should be able to input value', () => {
    input.triggerEventHandler('input', {
      target: {
        value: 'angular',
      },
    });
    fixture.detectChanges();
    expect(component.term).toBe('angular');
  });

  it('should prevent form default behavior and emit value on form submission.', () => {
    let inputTerm: string | undefined;
    component.submitted
      .pipe(first())
      .subscribe((term: string) => (inputTerm = term));
    input.triggerEventHandler('input', {
      target: {
        value: 'vue',
      },
    });
    form.triggerEventHandler('submit', {
      preventDefault: preventDefaultSpy,
    });
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(inputTerm).toBe('vue');
  });
});
