import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { RegisterComponent } from '../register/register.component';
import { User } from '../shared/models/user.model';
import { UsersInfo } from '../shared/models/usersInfo.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.scss']
})
export class AddassociateComponent implements OnInit {
  registerFormInstance!: FormGroup;
  user!: User;
  usersInfo! : UsersInfo;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.registerFormInstance = this.fb.group({
        username:['', [Validators.required, Validators.minLength(3)]],
        role:[''],
        // name:[''],
        // phone:[''],
        // email:[''],
        // address:[''],
        // city:[''],
        // state:[''],
        // zip:[''],
        passwordGroup: this.fb.group({
        password: '',
        confirm: ''
        },{validators:[RegisterComponent.passwordsValidator]})
        });
  }

  static passwordsValidator({value:{password, confirm}}:FormGroup): null | {passwordNotMatch: string} {
    return password === confirm ? 
      null : 
      {passwordNotMatch: 'password and confirmPassword mismatch!'};
    }

  submitHandler(registerFormInstance: FormGroup){
    let username = registerFormInstance.value.username,
        password = registerFormInstance.value.passwordGroup.password,
        role = registerFormInstance.value.role;
        // name = registerFormInstance.value.name,
        // phone = registerFormInstance.value.phone,
        // email = registerFormInstance.value.email,
        // address = registerFormInstance.value.address,
        // city = registerFormInstance.value.city,
        // state = registerFormInstance.value.state,
        // zip = registerFormInstance.value.zip;

    this.auth.register({username, password})
    // .pipe(switchMap( res => {
    //   let user = res.user;
    //   this.auth.addUsersInfo({name, phone, email, address, city, state, zip, user})
    // }))
    .subscribe(res =>{
      if(res.success){
        console.log(res)
        //let user = res.user;
       // this.auth.addUsersInfo({name, phone, email, address, city, state, zip, user})
      this.router.navigate(['/home']).catch();
      }
    })
  }
}