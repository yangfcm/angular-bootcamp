import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiModulesAccordionComponent } from './ui-modules-accordion.component';
import { itemsData } from '../ui-modules-home/ui-modules-home.component';

describe('UiModulesAccordionComponent', () => {
  let component: UiModulesAccordionComponent;
  let fixture: ComponentFixture<UiModulesAccordionComponent>;
  let titleDivs: DebugElement[], contentDivs: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiModulesAccordionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiModulesAccordionComponent);
    component = fixture.componentInstance;
    component.items = itemsData;
    fixture.detectChanges();
    titleDivs = fixture.debugElement.queryAll(By.css('.title'));
    contentDivs = fixture.debugElement.queryAll(By.css('.accordion .content'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of accordion divs', () => {
    expect(titleDivs.length).toBe(itemsData.length);
    expect(contentDivs.length).toBe(itemsData.length);
  });

  it('the first item should be active and the rest are inactive initially', () => {
    const { openedItemIndex } = component;
    expect(openedItemIndex).toBe(0);
    for (let i = 0; i < itemsData.length; i++) {
      if (i === openedItemIndex) {
        expect(titleDivs[i].nativeElement.className).toContain('active');
        expect(contentDivs[i].nativeElement.className).toContain('active');
      } else {
        expect(titleDivs[i].nativeElement.className).not.toContain('active');
        expect(contentDivs[i].nativeElement.className).not.toContain('active');
      }
    }
  });

  it('should toggle the active title and content on clicking one of the titles', () => {
    titleDivs[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    const { openedItemIndex } = component;
    expect(openedItemIndex).toBe(1);
    for (let i = 0; i < itemsData.length; i++) {
      if (i === openedItemIndex) {
        expect(titleDivs[i].nativeElement.className).toContain('active');
        expect(contentDivs[i].nativeElement.className).toContain('active');
      } else {
        expect(titleDivs[i].nativeElement.className).not.toContain('active');
        expect(contentDivs[i].nativeElement.className).not.toContain('active');
      }
    }
  });
});
