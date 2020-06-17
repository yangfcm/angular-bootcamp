import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldNewsArticlesComponent } from './world-news-articles.component';

describe('WorldNewsArticlesComponent', () => {
  let component: WorldNewsArticlesComponent;
  let fixture: ComponentFixture<WorldNewsArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldNewsArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldNewsArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
