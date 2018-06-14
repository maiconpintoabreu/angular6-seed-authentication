import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  model: User;
  constructor(private userService : UserService, private router : Router) { }
  ngOnInit() {
    this.newUser();
  }
  onSubmit() :void {
    this.userService.newUser(this.model).subscribe(res=>{
      this.router.navigate(['/admin']);
    },err=>{

    });
  }
  newUser() : void {
    this.model = new User();
    this.model.roles = [];
    this.model.roles.push("USER");
  }
}
