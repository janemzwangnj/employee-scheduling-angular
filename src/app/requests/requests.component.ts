import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { USER_DEFAULTS } from 'angularx-flatpickr';
import { concat, elementAt, map, switchMap } from 'rxjs';
import { Timeoffrequests } from '../shared/models/timeoffrequest.model';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { TimeoffService } from '../shared/services/timeoff.service';

export interface PeriodicElement {
  id?: number;
  name?: string;
  start?: string;
  end?: string;
  reason?: string;
  status?: string;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  timeoffrequests?: Timeoffrequests[] | null; 
  tableData?: PeriodicElement[] | null;

  displayedColumns: string[] = ['name', 'start', 'end', 'reason', 'status', 'approved','rejected'];
  dataSource = this.tableData;

  constructor(
    private timeoffService: TimeoffService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.timeoffService.getTimeoffrequestsByStatus("pending")
    .subscribe(res => {
      this.timeoffrequests = res;
      this.tableData = this.timeoffrequests?.map(element => {
        var id = element.id,
            name: string ='',
            uid = element.uid,
            start = element.start,
            end = element.end,
            reason = element.reason,
            status = element.status;
            uid&&this.auth.getUser(uid)
              .subscribe(res => {
                name=res.username;
                console.log(res);
              })
        return {id, name, start, end, reason, status}
      });
    });
  }

  approveHandler(id:number, review:string){
    this.timeoffService.getTimeoffrequestsById(id)
    .subscribe(res => {
      var id: number = res.id,
      start: string = res.start,
      end: string = res.end,
      reason: string = res.reason,
      status: string = review,
      uid: number = res.uid;
      this.timeoffService.updateTimeoffrequests({id, start, end, reason, status, uid})
      .subscribe(res =>{
        if(res.success){
          this.timeoffService.getTimeoffrequestsByStatus("pending")
              .subscribe(res => {
                this.timeoffrequests = res;
                this.tableData = this.timeoffrequests?.map(element => {
                  var id = element.id,
                      name: string ='',
                      uid = element.uid,
                      start = element.start,
                      end = element.end,
                      reason = element.reason,
                      status = element.status;
                      uid&&this.auth.getUser(uid)
                        .subscribe(res => {
                          name=res.username;
                          console.log(res);
                        })
                  return {id, name, start, end, reason, status}
                });
              }); 
          this.router.navigate(['/requests']).catch();
        }
      })
    })
  }
}
