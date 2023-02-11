import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { UsersInfo } from '../models/usersInfo.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  hr: User | null = null;
  manager: User | null = null;

  users_info: UsersInfo | null = null;

  constructor(
    private httpClient: HttpClient
  ) { 
    // this.checkLogin()
    // .subscribe(res =>{
    //   console.log(res);
    //   //this.user = res.success? res.user : null

    //   if(this.userRole(res.user, "ADMIN")){
    //     this.hr =res.user;
    //     this.manager =res.user;
    //   }
    //   if(this.userRole(res.user, "USER")){
    //     this.user =res.user;  
    //   }

    // })
  }

  checkLogin(): Observable<{success: boolean, user: User}>{
    return this.httpClient.get<{success: boolean, user: User}>(`${environment.api}/checklogin`)
  }

  logout(){
    this.httpClient.get(`${environment.api}/logout`);
    this.user = null;
    this.hr = null;
    this.manager = null;
  }

  register(user:{username: string, password: string}):Observable<{success: boolean, user: User}> { 
    return this.httpClient.post<{success: boolean, user: User}>(
      `${environment.api}/users`,
      user,
    );
  }

  addUsersInfo(users_info:{name: string, 
                          phone : string, 
                          email: string, 
                          address: string,
                          city: string,
                          state: string,
                          zip: string
                          // user: User
                        }):Observable<{success: boolean, usersInfo: UsersInfo}> { 
    return this.httpClient.post<{success: boolean, usersInfo: UsersInfo}>(
      `${environment.api}/users_info`,
      users_info,
    );
  }

  getUser(id:number):Observable<any> {
    return this.httpClient.get(`${environment.api}/users/${id}`);
  }

  getUserAll():Observable<any> {
    return this.httpClient.get(`${environment.api}/users`);
  }

  removeUser(id:number):Observable<any> {
    return this.httpClient.delete(`${environment.api}/users/${id}`);
  }

  updateUser(user:{username: string, password: string}):Observable<{success: boolean, user: User}> { 
    return this.httpClient.put<{success: boolean, user: User}>(
      `${environment.api}/users`,
      user,
    );
  }


  //login(user:{username: string, password: string}):Observable<{success: boolean, user: User, token: string}> { 
    // return this.httpClient.post<{success: boolean, user: User, token: string}>(
    //   `${environment.api}/login`,
    //   user
    // );} 
    // above login for JWT

  login(user:{username: string, password: string}):Observable<{success: boolean, user: User}> { 
  // java spring security takes form data
  const userFormData = new HttpParams()
                              .append('username', user.username)
                              .append('password', user.password);
  return this.httpClient.post<{success:boolean, user:User}>(
    `${environment.api}/login`,
    userFormData,
    //for cookie Session based, set cookie/carry cookie
    {withCredentials: true}
  );
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
