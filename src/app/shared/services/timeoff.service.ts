import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Timeoffrequests } from '../models/timeoffrequest.model';

@Injectable({
  providedIn: 'root'
})
export class TimeoffService {

  constructor(
    private httpClient: HttpClient
  ) { }

  addTimeoffrequests( timeoffrequests: {start: string, end: string, reason: string, status: string, uid: number } ):Observable<{success: boolean, timeoffrequests: Timeoffrequests}> { 
    return this.httpClient.post<{success: boolean, timeoffrequests: Timeoffrequests}>(
      `${environment.api}/timeoffrequests`,
      timeoffrequests,
    );
  }

  getTimeoffrequestsByUid(uid:number):Observable<any> {
    return this.httpClient.get(`${environment.api}/timeoffrequests/uid/${uid}`);
  }

  getTimeoffrequestsByStatus(status:string):Observable<any> {
    return this.httpClient.get(`${environment.api}/timeoffrequests/${status}`);
  }

  getTimeoffrequestsById(id:number):Observable<any> {
    return this.httpClient.get(`${environment.api}/timeoffrequests/id/${id}`);
  }

  updateTimeoffrequests( timeoffrequests: { id: number, start: string, end: string, reason: string, status: string, uid:number } ):Observable<{success: boolean, timeoffrequests: Timeoffrequests}> { 
    return this.httpClient.put<{success: boolean, timeoffrequests: Timeoffrequests}>(
      `${environment.api}/timeoffrequests`,
      timeoffrequests,
    );
  }

  removeTimeoffrequests(id:number):Observable<any> {
    return this.httpClient.delete(`${environment.api}/timeoffrequests/${id}`);
  }

}
