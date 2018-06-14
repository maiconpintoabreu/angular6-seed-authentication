import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }
  users: User[];
  ngOnInit() {
    this.getUsers();
  }
  getUsers() : void {
    this.userService.getUsers().subscribe(res=>{
      this.users = res;
    });
  }
  deleteUser(id: string) : void {
    this.userService.deleteUser(id).subscribe(res=>{
      this.getUsers();
    },
    err=>{
      console.log(err);
    });
  }

}
