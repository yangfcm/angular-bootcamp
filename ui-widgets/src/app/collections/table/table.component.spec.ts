import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';
import { data, headers } from '../collections-home/collections-home.component';

const MY_TABLE_CLASS = 'my-table-clas';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let table: DebugElement, tableHeaders: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.data = data;
    component.headers = headers;
    component.classNames = MY_TABLE_CLASS;
    fixture.detectChanges();
    table = fixture.debugElement.query(By.css('table'));
    tableHeaders = fixture.debugElement.queryAll(By.css('table th'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('table should have passed class names', () => {
    expect(table.nativeElement.className).toContain(MY_TABLE_CLASS);
  });

  it('table should have headers passed to it', () => {
    expect(tableHeaders.length).toBe(headers.length);
    for (let i = 0; i < headers.length; i++) {
      expect(tableHeaders[i].nativeElement.innerText).toContain(
        headers[i].label
      );
    }
  });

  it("table's first row has correct element from data", () => {
    const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    const firstRow = rows[0];
    expect(firstRow.nativeElement.innerText).toContain(data[0][headers[0].key]);
    expect(firstRow.nativeElement.innerText).toContain(data[0][headers[1].key]);
    expect(firstRow.nativeElement.innerText).toContain(data[0][headers[2].key]);
  });

  it("table's last row has correct element from data", () => {
    const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    const firstRow = rows[rows.length - 1];
    expect(firstRow.nativeElement.innerText).toContain(
      data[data.length - 1][headers[0].key]
    );
    expect(firstRow.nativeElement.innerText).toContain(
      data[data.length - 1][headers[1].key]
    );
    expect(firstRow.nativeElement.innerText).toContain(
      data[data.length - 1][headers[2].key]
    );
  });
});
