import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PageListComponent } from './page-list.component';
import { Page } from '../wiki.service';

const PAGES_DATA: Page[] = [
  {
    pageid: 1,
    title: 'Angular',
    wordcount: 142,
    snippet: 'Angular may refer to ...',
  },
  {
    pageid: 2,
    title: 'Angular(web framework)',
    wordcount: 1273,
    snippet:
      'Angular is a typescript-based open-source web application framework',
  },
  {
    pageid: 3,
    title: 'Angular momentum',
    wordcount: 11327,
    snippet:
      'In physics, Angular momentum is the rotational equivalent of linear momentum',
  },
];

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListComponent);
    component = fixture.componentInstance;
    component.pages = PAGES_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table with correct data', () => {
    const trs = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(trs.length).toBe(PAGES_DATA.length);
    for (let i = 0; i < PAGES_DATA.length; i++) {
      expect(trs[i].nativeElement.innerText).toContain(PAGES_DATA[i].snippet);
      expect(trs[i].nativeElement.innerText).toContain(PAGES_DATA[i].title);
      expect(trs[i].nativeElement.innerText).toContain(PAGES_DATA[i].wordcount);
    }
  });

  it('should render the correct link to wikipedia page', () => {
    const links = fixture.debugElement.queryAll(By.css('table tbody a'));
    expect(links.length).toBe(PAGES_DATA.length);
    for (let i = 0; i < PAGES_DATA.length; i++) {
      expect(links[i].nativeElement.getAttribute('href')).toBe(
        `https://en.wikipedia.org?curid=${PAGES_DATA[i].pageid}`
      );
    }
  });
});
