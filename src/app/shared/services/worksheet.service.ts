import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorksheetService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getWorksheetByUid(uid:number):Observable<any> {
    return of([]);
    //return this.httpClient.get(`${environment.api}/worksheet/${uid}`);
  }
}
