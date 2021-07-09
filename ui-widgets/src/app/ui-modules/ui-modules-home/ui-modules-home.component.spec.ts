import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UiModulesHomeComponent, itemsData } from './ui-modules-home.component';

describe('UiModulesHomeComponent', () => {
  let component: UiModulesHomeComponent;
  let fixture: ComponentFixture<UiModulesHomeComponent>;
  let button: DebugElement, modal: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiModulesHomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiModulesHomeComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.query(By.css('.button'));
    modal = fixture.debugElement.query(By.css('app-ui-modules-modal'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title for modal component and accordion component', () => {
    const titles = fixture.debugElement.queryAll(By.css('app-title'));
    expect(titles[0].nativeElement.innerText).toContain('Modal Component');
    expect(titles[1].nativeElement.innerText).toContain('Accordion Component');
  });

  it('should render accordion component and get correct data passed to it', () => {
    const accordion = fixture.debugElement.query(
      By.css('app-ui-modules-accordion')
    );
    expect(accordion.properties.items).toEqual(itemsData);
  });

  it('should not render modal initially', () => {
    expect(modal).toBeFalsy();
  });

  it('should render modal when button is clicked and close modal when close button is clicked', () => {
    expect(button).toBeTruthy();
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    modal = fixture.debugElement.query(By.css('app-ui-modules-modal'));
    expect(modal).toBeTruthy();

    const closeButton = fixture.debugElement.query(
      By.css('app-ui-modules-modal button')
    );
    closeButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    modal = fixture.debugElement.query(By.css('app-ui-modules-modal'));
    expect(modal).toBeFalsy();
  });
});
