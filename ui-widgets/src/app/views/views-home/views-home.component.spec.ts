import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  ViewsHomeComponent,
  statsData,
  itemsData,
} from './views-home.component';

describe('ViewsHomeComponent', () => {
  let component: ViewsHomeComponent;
  let fixture: ComponentFixture<ViewsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewsHomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title for statistics component and list component', () => {
    const titles = fixture.debugElement.queryAll(By.css('app-title'));
    expect(titles[0].nativeElement.innerText).toContain('Statistics Component');
    expect(titles[1].nativeElement.innerText).toContain('Item List Component');
  });

  it('should render statistics component and get correct data passed to it', () => {
    const statistics = fixture.debugElement.query(By.css('app-statistics'));
    expect(statistics.properties.data).toEqual(statsData);
  });

  it('should render list component and get correct data passed to it', () => {
    const list = fixture.debugElement.query(By.css('app-item-list'));
    expect(list.properties.data).toEqual(itemsData);
  });
});
