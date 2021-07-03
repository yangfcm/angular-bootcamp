import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent, postsData } from './app.component';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card/card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, CardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have correct posts data', () => {
    expect(app.posts.length).toBe(postsData.length);
    expect(app.posts).toEqual(postsData);
  });

  it('should have CardComponent as child component and the number of CardComponent equal to the length of posts property', () => {
    const children = fixture.debugElement.queryAll(By.css('app-card'));
    expect(children.length).toBe(postsData.length);
  });
});
