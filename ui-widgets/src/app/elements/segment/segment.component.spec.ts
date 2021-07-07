import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SegmentComponent } from './segment.component';

@Component({
  template: `
    <app-segment>
      <header>Header</header>
      <div id="seg-content">Content</div>
    </app-segment>
  `,
})
class TestComponent {}

describe('SegmentComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentComponent, TestComponent],
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

  it('should render header and content', () => {
    const header = fixture.debugElement.query(By.css('header'));
    expect(header).toBeTruthy();
    expect(header.nativeElement.innerText).toContain('Header');

    const content = fixture.debugElement.query(By.css('#seg-content'));
    expect(content).toBeTruthy();
    expect(content.nativeElement.innerText).toContain('Content');
  });
});
