import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModulesHomeComponent } from './ui-modules-home.component';

describe('UiModulesHomeComponent', () => {
  let component: UiModulesHomeComponent;
  let fixture: ComponentFixture<UiModulesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiModulesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiModulesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
