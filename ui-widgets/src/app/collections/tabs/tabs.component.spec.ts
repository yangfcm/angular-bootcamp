import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { TabsComponent } from './tabs.component';
import { routes } from '../collections-routing.module';

describe('TabsComponent', () => {
  let location: Location;
  let router: Router;
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [TabsComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(TabsComponent);

    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render three links', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(3);
  });

  it('should be at / route initially', () => {
    expect(location.path()).toBe('/');
  });

  it('should be able to navigate to companies', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['/companies']);
      tick();
      expect(location.path()).toBe('/companies');
      flush();
    });
  }));

  it('should be able to navigate to partners', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['/partners']);
      tick();
      expect(location.path()).toBe('/partners');
      flush();
    });
  }));
});
