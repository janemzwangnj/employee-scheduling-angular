import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router} from '@angular/router';
import { switchMap } from 'rxjs';
import { ProfileComponent } from '../associate/profile/profile.component';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFailed: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitHandler(loginForm: NgForm){
    this.loginFailed = false;
    //console.log(loginForm.value);
    //loginForm.value is a form data 
    this.auth.login(loginForm.value)
      .pipe(switchMap(() => this.auth.checkLogin()))
      .subscribe(res => { 
        console.log(res); 
      if(res.success){
      if(this.userRole(res.user, "ADMIN")){
        this.auth.hr =res.user;
        this.auth.manager =res.user;
      }
      if(this.userRole(res.user, "USER")){
        this.auth.user =res.user;  
      }
        this.router.navigate(['/home']).catch();
      } else {
      this.loginFailed = true;
      this.router.navigate(['/login']).catch();
      }
      })
  }
  
  userRole(user: User, role:String): Boolean {
    let isIncluded = false;
    for(let profile of user.profiles!){
      if(profile.type===role){
        isIncluded = true;
      }
    }
    return isIncluded;
  }
}
