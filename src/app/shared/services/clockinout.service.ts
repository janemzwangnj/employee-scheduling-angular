import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Timecards } from '../models/timecards.model';

@Injectable({
  providedIn: 'root'
})
export class ClockinoutService {
  timecards: Timecards | null = null;

  constructor(
    private httpClient: HttpClient
  ) { }

  getEmployee(eid:string):Observable<any> {
    return this.httpClient.get(`${environment.api}/employees/${eid}`);
  }
  getEmployeeByUid(uid:number):Observable<any> {
    return this.httpClient.get(`${environment.api}/employees/uid/${uid}`);
  }

  getTimecards(eid:string):Observable<any> {
    return this.httpClient.get(`${environment.api}/timecards/${eid}`);
  }


  addTimecards( timecards: { start_time: string, end_time: string, eid: string } ):Observable<{success: boolean, timecards: Timecards}> { 
    return this.httpClient.post<{success: boolean, timecards: Timecards}>(
      `${environment.api}/timecards`,
      timecards,
    );
  }

  updateTimecards( timecards: { start_time: string, end_time: string, eid: string } ):Observable<{success: boolean, timecards: Timecards}> { 
    return this.httpClient.put<{success: boolean, timecards: Timecards}>(
      `${environment.api}/timecards`,
      timecards,
    );
  }
}


