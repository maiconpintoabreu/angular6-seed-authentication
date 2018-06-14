import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailuserComponent } from './detailuser.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, from, of } from 'rxjs';
export class ActivatedRouteMock {
  public paramMap = of(convertToParamMap({ 
      id: 'abc123'          
  }));
}
describe('DetailuserComponent', () => {
  let component: DetailuserComponent;
  let fixture: ComponentFixture<DetailuserComponent>;
  let valueServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('UserService', ['getUser']);
    TestBed.configureTestingModule({
      declarations: [ DetailuserComponent ],
      imports: [
        FormsModule,
      ],providers:[
        { provide: UserService, useValue: spy },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let user = new User();
    valueServiceSpy = TestBed.get(UserService);
    valueServiceSpy.getUser.and.returnValue(user);
    fixture = TestBed.createComponent(DetailuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
