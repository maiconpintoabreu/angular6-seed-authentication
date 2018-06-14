import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserComponent } from './newuser.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLinkDirectiveStub } from '../../../testing';
import { UserService } from '../../services/user.service';
export class MockUserService {

}
export class MockRouter {

}
describe('NewuserComponent', () => {
  let component: NewuserComponent;
  let fixture: ComponentFixture<NewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserComponent ],
      imports: [
        FormsModule,
        
      ],
      
      providers: [
            {provide: UserService, useClass: MockUserService},
            {provide: Router, useClass: MockRouter},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
