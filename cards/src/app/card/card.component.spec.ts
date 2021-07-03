import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { postsData } from '../app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let card: CardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    card = fixture.componentInstance;
    const post = postsData[0];
    card.title = post.title;
    card.imageUrl = post.imageUrl;
    card.content = post.content;
    card.username = post.username;
    fixture.detectChanges();
  });

  it('should create the card component', () => {
    const fixture = TestBed.createComponent(CardComponent);
    const card = fixture.componentInstance;
    expect(card).toBeTruthy();
  });

  it('should render correct content', () => {
    const imgEl = fixture.debugElement.query(By.css('.app--card img'));
    const titleEl = fixture.debugElement.query(By.css('.app--card p.title'));
    const subtitleEl = fixture.debugElement.query(
      By.css('.app--card p.subtitle')
    );
    const contentEl = fixture.debugElement.query(
      By.css('.app--card div.content')
    );
    expect(imgEl.attributes.src).toBe(postsData[0].imageUrl);
    expect(titleEl.nativeElement.textContent).toBe(postsData[0].title);
    expect(subtitleEl.nativeElement.textContent).toContain(
      postsData[0].username
    );
    expect(contentEl.nativeElement.textContent).toContain(postsData[0].content);
  });
});
