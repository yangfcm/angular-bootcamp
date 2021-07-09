import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  CollectionsHomeComponent,
  data,
  headers,
} from './collections-home.component';

describe('CollectionsHomeComponent', () => {
  let component: CollectionsHomeComponent;
  let fixture: ComponentFixture<CollectionsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsHomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title for table component and tabs component', () => {
    const titles = fixture.debugElement.queryAll(By.css('app-title'));
    expect(titles[0].nativeElement.innerText).toContain('Table Component');
    expect(titles[1].nativeElement.innerText).toContain('Tab Menu');
  });

  it('should render table component and get correct data passed to it', () => {
    const table = fixture.debugElement.query(By.css('app-table'));
    expect(table).toBeTruthy();
    expect(table.properties.data).toEqual(data);
    expect(table.properties.headers).toEqual(headers);
  });

  it('should render tabs component', () => {
    const tabsMenu = fixture.debugElement.query(By.css('app-tabs'));
    expect(tabsMenu).toBeTruthy();
  });
});
