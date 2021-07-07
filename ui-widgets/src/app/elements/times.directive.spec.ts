import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimesDirective } from './times.directive';

@Component({
  template: ` <div *appTimes="3" class="count-div">test</div> `,
})
class TestComponent {}

describe('TimesDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, TimesDirective],
    }).createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create 3 divs', () => {
    const divs = fixture.debugElement.queryAll(By.css('.count-div'));
    expect(divs.length).toBe(3);
  });
});
