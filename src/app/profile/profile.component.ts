import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersInfo } from '../shared/models/usersInfo.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  registerFormInstance!: FormGroup;
  usersInfo! : UsersInfo;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.registerFormInstance = this.fb.group({
      name:'',
      phone:'',
      email:'',
      address:'',
      city:'',
      state:'',
      zip: '',
      });
  }

  submitHandler(registerFormInstance: FormGroup){
    var name = registerFormInstance.value.name,
        phone = registerFormInstance.value.phone,
        email = registerFormInstance.value.email,
        address = registerFormInstance.value.address,
        city = registerFormInstance.value.city,
        state = registerFormInstance.value.state,
        zip = registerFormInstance.value.zip;
    this.auth.checkLogin()
    .subscribe()
   // this.auth.addUsersInfo({name, phone, email, address, city, state, zip})
    // .subscribe(res =>{
    //   if(res.success){
    //     console.log(res)
    //     let user = res.user;
       this.router.navigate(['/home']).catch();
    //   }
    // })
  }
  resetHandler(registerFormInstance: FormGroup){
    let username = registerFormInstance.value.username,
    password = registerFormInstance.value.passwordGroup.password,
    role = registerFormInstance.value.role;

    this.auth.updateUser({username, password})
    .subscribe(res =>{
      if(res.success){
        console.log(res)
      this.router.navigate(['/home']).catch();
      }
    })
  }

}
