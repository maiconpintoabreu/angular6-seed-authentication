import { UserService } from "./user.service";
import { User } from "../models/user";
import { asyncData } from "../../testing";

let httpClientSpy: { get: jasmine.Spy };
let authServiceSpy: { getToken: jasmine.Spy };
let userService: UserService;
 
beforeEach(() => {
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
  userService = new UserService(<any> httpClientSpy,<any> authServiceSpy);
});
 
it('should return expected users (HttpClient called once)', () => {
  const expectedUsers: User[] =
    [{ id: '1', name: 'admin', userName: 'admin', password: 'admin', roles:[] }];
    let token = {"access_token":"2e3ee407-6797-412e-83f6-4e16fb512a49","token_type":"bearer","refresh_token":"e054a164-af98-4cc9-91cc-ba41a0d70a60","expires_in":9893,"scope":"read write openid"};
  authServiceSpy.getToken.and.returnValue(asyncData(token));
  httpClientSpy.get.and.returnValue(asyncData(expectedUsers));
 
  userService.getUsers().subscribe(
    users => expect(users).toEqual(expectedUsers, 'expected users'),
    fail
  );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});