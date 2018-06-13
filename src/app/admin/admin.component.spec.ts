import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AdminComponent } from './admin.component';
import { RouterLinkDirectiveStub } from '../../testing';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

@Component({selector: 'app-banner', template: ''})
class BannerStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

@Component({selector: 'app-welcome', template: ''})
class WelcomeStubComponent {}

let comp:    AdminComponent;
let fixture: ComponentFixture<AdminComponent>;

//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AdminComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
        BannerStubComponent,
        RouterLinkDirectiveStub,
      ],
      providers:[AuthService, AuthGuard],
      imports:[RouterTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AdminComponent);
      comp    = fixture.componentInstance;
    });
  }));
  tests();
});

function tests() {
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    fixture.detectChanges();

    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkDirectiveStub));

    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(2, 'should have 2 routerLinks');
    expect(routerLinks[0].linkParams).toBe('./');
    expect(routerLinks[1].linkParams).toBe('./new');
  });

  it('can click link in template', () => {
    const linkDe = linkDes[1];
    const link = routerLinks[1];

    expect(link.navigatedTo).toBeNull('should not have navigated yet');
    let token = {"access_token":"2e3ee407-6797-412e-83f6-4e16fb512a49","token_type":"bearer","refresh_token":"e054a164-af98-4cc9-91cc-ba41a0d70a60","expires_in":9893,"scope":"read write openid"};
    localStorage.setItem('token',JSON.stringify(token));
    linkDe.triggerEventHandler('click', "./new");
    fixture.detectChanges();

    expect(link.navigatedTo).toBe('./new');
  });
}