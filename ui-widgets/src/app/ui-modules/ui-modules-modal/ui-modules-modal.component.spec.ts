import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiModulesModalComponent } from './ui-modules-modal.component';

@Component({
  template: `
    <app-ui-modules-modal (close)="onClose()">
      <div modalTitle>Modal title</div>
      <div>Modal content</div>
      <div modalFooter>Modal footer</div>
    </app-ui-modules-modal>
  `,
})
class TestComponent {
  onClose: jasmine.Spy<jasmine.Func>;
}

describe('UiModulesModalComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let modalHeader: DebugElement,
    modalContent: DebugElement,
    closeIcon: DebugElement,
    okButton: DebugElement;
  let onCloseSpy: jasmine.Spy<jasmine.Func>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiModulesModalComponent, TestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    modalHeader = fixture.debugElement.query(By.css('.header'));
    modalContent = fixture.debugElement.query(By.css('.content'));
    closeIcon = fixture.debugElement.query(By.css('i.close'));
    okButton = fixture.debugElement.query(By.css('button.button'));
    onCloseSpy = jasmine.createSpy('onCloseSpy');
    component.onClose = onCloseSpy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct header', () => {
    expect(modalHeader.nativeElement.innerText).toContain('Modal title');
  });

  it('should render correct content', () => {
    expect(modalContent.nativeElement.innerText).toContain('Modal content');
  });

  it('should render close icon and ok button', () => {
    expect(closeIcon).toBeTruthy();
    expect(okButton).toBeTruthy();
  });

  it('should emit close event', () => {
    closeIcon.triggerEventHandler('click', null);
    expect(onCloseSpy).toHaveBeenCalled();
    okButton.triggerEventHandler('click', null);
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
