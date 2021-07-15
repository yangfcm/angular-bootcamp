import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { PAGES_DATA } from './page-list/page-list.component.spec';
import { WikiService } from './wiki.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let wikiService;
  let searchSpy;
  let loader: DebugElement, errorMessage: DebugElement, pagesList: DebugElement;

  beforeEach(() => {
    wikiService = jasmine.createSpyObj('WikiService', ['search']);
    searchSpy = wikiService.search.and.returnValue(of(PAGES_DATA));
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: WikiService,
          useValue: wikiService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(app.isLoading).toBe(false);
    expect(app.pages).toEqual([]);
    expect(app.error).toBe('');
  });

  it('should render initial component', () => {
    fixture.detectChanges();
    const searchBar = fixture.debugElement.query(By.css('app-search-bar'));
    expect(searchBar).toBeTruthy();
    loader = fixture.debugElement.query(By.css('app-loader'));
    expect(loader).toBeFalsy();
    errorMessage = fixture.debugElement.query(By.css('app-error-message'));
    expect(errorMessage).toBeFalsy();
    pagesList = fixture.debugElement.query(By.css('app-page-list'));
    expect(pagesList).toBeFalsy();
  });

  it('return expected data on search term submitted', () => {
    app.onTermSubmitted('angular');
    fixture.detectChanges();
    pagesList = fixture.debugElement.query(By.css('app-page-list'));
    expect(pagesList).toBeTruthy();
    expect(searchSpy).toHaveBeenCalled();
  });

  it('should display error when wikiService fails', () => {
    searchSpy.and.returnValue(throwError({ message: 'service unavailable' }));
    app.onTermSubmitted('angular');
    fixture.detectChanges();
    errorMessage = fixture.debugElement.query(By.css('app-error-message'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.innerText).toBe('service unavailable');
  });
});
