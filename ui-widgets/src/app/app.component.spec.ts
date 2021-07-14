import {
  Component,
  Directive,
  HostListener,
  Input,
  DebugElement,
} from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@Directive({
  selector: '[routerLink]',
})
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({
  selector: 'router-outlet',
  template: '',
})
class RouterOutletStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let linkDes: DebugElement[];
  let routerLinks: RouterLinkDirectiveStub[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        RouterOutletStubComponent,
        RouterLinkDirectiveStub,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );
    routerLinks = linkDes.map((de) => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct router links', () => {
    expect(routerLinks.length).toBe(5);
    expect(routerLinks[0].linkParams).toBe('/');
    expect(routerLinks[1].linkParams).toBe('/elements');
    expect(routerLinks[2].linkParams).toBe('/collections');
    expect(routerLinks[3].linkParams).toBe('/views');
    expect(routerLinks[4].linkParams).toBe('/modules');
  });

  it('should navigate to /elements route on clicking elements link', () => {
    const elementsLink = routerLinks[1];
    const elementsLinkDe = linkDes[1];
    elementsLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(elementsLink.navigatedTo).toBe('/elements');
  });

  it('should navigate to /collections route on clicking collections link', () => {
    const collectionsLink = routerLinks[2];
    const collectionsLinkDe = linkDes[2];
    collectionsLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(collectionsLink.navigatedTo).toBe('/collections');
  });
  // Use the same method to test other routes.
});
