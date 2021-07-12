import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ItemListComponent } from './item-list.component';
import { itemsData } from '../views-home/views-home.component';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let images: DebugElement[], contentDivs: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    component.data = itemsData;
    fixture.detectChanges();
    images = fixture.debugElement.queryAll(By.css('img'));
    contentDivs = fixture.debugElement.queryAll(By.css('.content'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image with expected src', () => {
    expect(images.length).toBe(itemsData.length);
    for (let i = 0; i < itemsData.length; i++) {
      expect(images[i].nativeElement.src).toContain(itemsData[i].image);
    }
  });

  it('should render content div with expected title and description', () => {
    expect(contentDivs.length).toBe(itemsData.length);
    for (let i = 0; i < itemsData.length; i++) {
      expect(contentDivs[i].nativeElement.innerText).toContain(
        itemsData[i].title
      );
      expect(contentDivs[i].nativeElement.innerText).toContain(
        itemsData[i].description
      );
    }
  });
});
