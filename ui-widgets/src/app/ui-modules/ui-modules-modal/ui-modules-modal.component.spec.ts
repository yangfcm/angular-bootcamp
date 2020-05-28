import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModulesModalComponent } from './ui-modules-modal.component';

describe('UiModulesModalComponent', () => {
  let component: UiModulesModalComponent;
  let fixture: ComponentFixture<UiModulesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiModulesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiModulesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
