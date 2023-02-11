// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {
//   ufc!: FormControl;
//   pfc!: FormControl;
//   cpfc!: FormControl;
//   registorFormInstance!: FormGroup;

//   constructor() { }

//   ngOnInit(): void {
//     this.ufc = new FormControl('Initial Value',[Validators.email, Validators.required]);
//     this.pfc = new FormControl();
//     this.cpfc = new FormControl();
//     this.registorFormInstance = new FormGroup({
//       username: this.ufc,
//       password: this.pfc,
//       confirmPassword: this.cpfc
//     });
    
//     this.ufc.valueChanges
//       .subscribe(val => console.log(val));
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormInstance!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.registerFormInstance = this.fb.group({
      username:['', [Validators.required, Validators.minLength(3)]],
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

  static test({value:{password, confirm}}:FormGroup){
    return password === '123' ?
        null :
        {passwordIsNot123: 'password is not 123!'}
  }

  submitHandler(registerFormInstance: FormGroup){
    var username = registerFormInstance.value.username,
        password = registerFormInstance.value.passwordGroup.password;
    this.auth.register({username, password})
    .subscribe(res =>{
      if(res.success){
      this.router.navigate(['/login']).catch();
      }
    })
  }

}
