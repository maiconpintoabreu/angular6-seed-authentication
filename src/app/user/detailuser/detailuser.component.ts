import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {
  model: User;
  constructor(private userService: UserService, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.model = new User();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getUser(params.get('id')))
    ).subscribe(res=>{
      console.log(res);
      this.model = res;
    },err=>{
      console.log(err);
    });
  }
  onSubmit() :void {
    this.userService.updateUser(this.model).subscribe(res=>{
      console.log("Success");
    },err=>{

    });
  }

}
