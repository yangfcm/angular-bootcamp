import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MyClassDirective } from './my-class.directive';

@Component({
  template: `
    <div
      [appMyClass]="{
        title: true,
        red: true,
        highlight: false
      }"
    >
      Test div
    </div>
  `,
})
class TestComponent {}

describe('MyClassDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [MyClassDirective, TestComponent],
    }).createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should have "title" class, not have "highlight" class', () => {
    const testDiv = fixture.debugElement.query(By.directive(MyClassDirective));
    expect(testDiv.nativeElement.className).toContain('title');
    expect(testDiv.nativeElement.className).toContain('red');
    expect(testDiv.nativeElement.className).not.toContain('highlight');
  });
});
