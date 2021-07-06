import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimesDirective } from './times.directive';

@Component({
  template: `
    <div *appTimes="3; let i = index" class="count-div">count: {{ i }}</div>
  `,
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

  it('should display index on each div', () => {
    const divs = fixture.debugElement.queryAll(By.css('.count-div'));
    expect(divs[0].nativeElement.innerText).toContain('0');
    expect(divs[1].nativeElement.innerText).toContain('1');
    expect(divs[2].nativeElement.innerText).toContain('2');
  });
});
