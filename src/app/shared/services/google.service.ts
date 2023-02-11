import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GoogleService{
  constructor(
    private httpClient: HttpClient
  ){}

  getUser(id:number):Observable<any> {
    return this.httpClient.get(`${environment.api}/users/${id}`);
  }
}
