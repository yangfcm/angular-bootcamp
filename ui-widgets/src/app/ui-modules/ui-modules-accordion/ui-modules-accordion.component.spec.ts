import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModulesAccordionComponent } from './ui-modules-accordion.component';

describe('UiModulesAccordionComponent', () => {
  let component: UiModulesAccordionComponent;
  let fixture: ComponentFixture<UiModulesAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiModulesAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiModulesAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
