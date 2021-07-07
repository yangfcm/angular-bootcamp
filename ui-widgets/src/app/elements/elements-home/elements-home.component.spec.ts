import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementsHomeComponent } from './elements-home.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ElementsHomeComponent', () => {
  let component: ElementsHomeComponent;
  let fixture: ComponentFixture<ElementsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElementsHomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title for placeholder component and segment component', () => {
    const titles = fixture.debugElement.queryAll(By.css('app-title'));
    expect(titles[0].nativeElement.innerText).toContain(
      'Placeholder Component'
    );
    expect(titles[1].nativeElement.innerText).toContain('Segment Component');
  });

  it('should render placeholder component and pass correct values to it', () => {
    const placeholder = fixture.debugElement.query(By.css('app-placeholder'));
    expect(placeholder).toBeTruthy();
    expect(placeholder.properties.header).toBe(true);
    expect(placeholder.properties.lines).toBe(4);
  });

  it('should render segment component and header and a button in it', () => {
    const segment = fixture.debugElement.query(By.css('app-segment'));
    expect(segment).toBeTruthy();

    const segHeader = fixture.debugElement.query(By.css('app-segment header'));
    expect(segHeader).toBeTruthy();
    expect(segHeader.nativeElement.innerText).toContain('No document!');

    const segButton = fixture.debugElement.query(By.css('button'));
    expect(segButton).toBeTruthy();
  });
});
