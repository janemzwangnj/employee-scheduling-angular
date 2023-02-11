import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { RegisterComponent } from '../register/register.component';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';

export interface PeriodicElement { 
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-associates',
  templateUrl: './associates.component.html',
  styleUrls: ['./associates.component.scss']
})
export class AssociatesComponent implements OnInit, AfterViewInit, AfterViewChecked {
  users: User [] | undefined;

  registerFormInstance!: FormGroup;
  user!: User;

    displayedColumns: string[] = ['id', 'name', 'role'];
    dataSource!: MatTableDataSource<any>;

  constructor(
    private auth: AuthService,
    private _liveAnnouncer: LiveAnnouncer,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.getUserAll()
    .subscribe(res => {
      console.log(res);
      this.users = res;
      console.log("******");
      console.log(this.users);
  
      let newArr = this.users?.map(({ id, username, password, profiles}) => {
                let role = profiles?.reduce((typeT, profile) => typeT +" " + profile.type, "");
                let name = username;
                return {id, name, role}
      });
  console.log(newArr);
    this.dataSource = new MatTableDataSource(newArr);
    });

    this.registerFormInstance = this.fb.group({
      username:['', [Validators.required, Validators.minLength(3)]],
      role:[''],
      passwordGroup: this.fb.group({
      password: '',
      confirm: ''
      },{validators:[RegisterComponent.passwordsValidator]})
      });

  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.sort && (this.dataSource.sort = this.sort);
  }

   ngAfterViewChecked(): void {
    this.sort && (this.dataSource.sort = this.sort);
   }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
  
      this.auth.register({username, password})
      .subscribe(res =>{
        if(res.success){
          console.log(res)
        this.router.navigate(['/home']).catch();
        }
      })
    }

    removeHandler(id: number): void{
      this.auth.removeUser(id)
        .subscribe(res =>{
          if(res.success){
          this.router.navigate(['/home']).catch();
          }
        });
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
