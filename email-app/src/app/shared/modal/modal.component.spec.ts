import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

@Component({
  template: `
    <app-modal (dismiss)="onDismiss()">
      <div modalTitle>title</div>
      <div>content</div>
      <div modalFooter>footer</div>
    </app-modal>
  `,
})
class TestComponent {
  onDismiss: jasmine.Spy<jasmine.Func>;
}

describe('ModalComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let modalHeader: DebugElement,
    modalContent: DebugElement,
    modalFooter: DebugElement,
    closeIcon: DebugElement,
    okButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent, TestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    modalHeader = fixture.debugElement.query(By.css('.header'));
    modalContent = fixture.debugElement.query(By.css('.content'));
    modalFooter = fixture.debugElement.query(By.css('.footer'));
    closeIcon = fixture.debugElement.query(By.css('i.close'));
    okButton = fixture.debugElement.query(By.css('.actions button.button'));
    component.onDismiss = jasmine.createSpy('onDismissSpy');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render modal header', () => {
    expect(modalHeader).toBeTruthy();
    expect(modalHeader.nativeElement.innerText).toContain('title');
  });

  it('should render modal body', () => {
    expect(modalContent).toBeTruthy();
    expect(modalContent.nativeElement.innerText).toContain('content');
  });

  it('should render modal footer', () => {
    expect(modalFooter).toBeTruthy();
    expect(modalFooter.nativeElement.innerText).toContain('footer');
  });

  it('should emit dismiss event if close button is clicked', () => {
    expect(closeIcon).toBeTruthy();
    closeIcon.triggerEventHandler('click', null);
    expect(component.onDismiss).toHaveBeenCalled();

    expect(okButton).toBeTruthy();
    okButton.triggerEventHandler('click', null);
    expect(component.onDismiss).toHaveBeenCalled();
  });
});
