import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MyClassDirective } from './my-class.directive';
import { TimesDirective } from './times.directive';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let currentImageDiv: DebugElement,
    currentImage: DebugElement,
    prevPage: DebugElement,
    prevLink: DebugElement,
    nextPage: DebugElement,
    nextLink: DebugElement,
    indexPages: DebugElement[],
    indexLinks: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MyClassDirective, TimesDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    currentImageDiv = fixture.debugElement.query(By.css('#current-image'));
    currentImage = fixture.debugElement.query(By.css('#current-image img'));
    prevPage = fixture.debugElement.query(By.css('#prev-link'));
    nextPage = fixture.debugElement.query(By.css('#next-link'));
    indexPages = fixture.debugElement.queryAll(By.css('.index-link'));
    prevLink = fixture.debugElement.query(By.css('#prev-link a'));
    nextLink = fixture.debugElement.query(By.css('#next-link a'));
    indexLinks = fixture.debugElement.queryAll(By.css('.index-link a'));
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should display the first image initially', () => {
    expect(currentImageDiv.nativeElement.innerText).toContain(
      app.images[0].title
    );
    expect(currentImage.nativeElement.attributes.src.value).toBe(
      app.images[0].imageUrl
    );
  });

  it('should disable prev link on the first page and hide the fourth page as it is out of window range', () => {
    expect(prevPage.nativeElement.className).toContain('disabled');
    expect(nextPage.nativeElement.className).not.toContain('disabled');
    indexPages = fixture.debugElement.queryAll(By.css('.index-link'));
    expect(indexPages.length).toBe(3);
    expect(indexPages[app.images.length - 1]).toBeFalsy();
  });

  it('should disable next link on the last page and hide the first page link as it is out of window range', () => {
    app.currentIndex = app.images.length - 1;
    fixture.detectChanges();
    expect(prevPage.nativeElement.className).not.toContain('disabled');
    expect(nextPage.nativeElement.className).toContain('disabled');
    indexPages = fixture.debugElement.queryAll(By.css('.index-link'));
    expect(indexPages.length).toBe(3);
    expect(indexPages[0].nativeElement.innerText).toContain('2');
  });

  it('should navigate around images by clicking nav links', () => {
    nextLink.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(app.currentIndex).toBe(1);
    expect(currentImage.nativeElement.attributes.src.value).toBe(
      app.images[app.currentIndex].imageUrl
    );

    nextLink.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(app.currentIndex).toBe(2);
    expect(currentImage.nativeElement.attributes.src.value).toBe(
      app.images[app.currentIndex].imageUrl
    );

    prevLink.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(app.currentIndex).toBe(1);
    expect(currentImage.nativeElement.attributes.src.value).toBe(
      app.images[app.currentIndex].imageUrl
    );

    indexLinks = fixture.debugElement.queryAll(By.css('.index-link a'));
    indexLinks[3].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(app.currentIndex).toBe(3);
    expect(currentImage.nativeElement.attributes.src.value).toBe(
      app.images[app.currentIndex].imageUrl
    );
  });

  it('only current page should have active class', () => {
    indexPages = fixture.debugElement.queryAll(By.css('.index-link'));
    expect(indexPages[app.currentIndex].nativeElement.className).toContain(
      'active'
    );
    expect(
      indexPages[app.currentIndex + 1].nativeElement.className
    ).not.toContain('active');

    app.currentIndex = 2;
    fixture.detectChanges();
    indexPages = fixture.debugElement.queryAll(By.css('.index-link'));
    expect(indexPages[app.currentIndex].nativeElement.className).toContain(
      'active'
    );
    expect(
      indexPages[app.currentIndex + 1].nativeElement.className
    ).not.toContain('active');
  });
});
