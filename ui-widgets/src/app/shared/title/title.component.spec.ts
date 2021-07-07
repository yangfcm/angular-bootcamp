import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TitleComponent } from './title.component';

@Component({
  template: `<app-title>I'm title</app-title>`,
})
class TestComponent {}

describe('TitleComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent, TestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct ng content', () => {
    const h2El = fixture.debugElement.query(By.css('h2'));
    expect(h2El.nativeElement.innerText).toBe("I'm title");
  });
});
