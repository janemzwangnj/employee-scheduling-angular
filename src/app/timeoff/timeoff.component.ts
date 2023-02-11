import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Timeoffrequests } from '../shared/models/timeoffrequest.model';
import { AuthService } from '../shared/services/auth.service';
import { TimeoffService } from '../shared/services/timeoff.service';

export interface PeriodicElement {
  id?: number;
  start?: string;
  end?: string;
  reason?: string;
  status?: string;
}

@Component({
  selector: 'app-timeoff',
  templateUrl: './timeoff.component.html',
  styleUrls: ['./timeoff.component.scss']
})
export class TimeoffComponent implements OnInit{
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  reason = new FormControl('');

  successAdd: string = '';
  timeoffrequests?: Timeoffrequests[] | null; 
  tableData?: PeriodicElement[] | null;

  displayedColumns: string[] = ['id', 'start', 'end', 'reason', 'status'];
  dataSource = this.tableData;

  constructor(
    private timeoffService: TimeoffService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.user?.id && this.timeoffService.getTimeoffrequestsByUid(this.auth.user?.id)
      .subscribe(res => {
        this.timeoffrequests = res;
        this.tableData = this.timeoffrequests?.map(element => {
          var id = element.id,
              start = element.start,
              end = element.end,
              reason = element.reason,
              status = element.status;
          return {id, start, end, reason, status}
        });
        console.log(this.tableData);
      });
  }

  addHandler(){
    var start = this.range.value.start!.toISOString().slice(0,10),
        end = this.range.value.end!.toISOString().slice(0,10),
        uid = this.auth.user?.id,
        reason = this.reason.value,
        status = 'pending';
    reason&&uid&&this.timeoffService.addTimeoffrequests({start, end, reason, status, uid})
      .subscribe(res => {
        if(res.success){
          this.successAdd = 'Your request is added sucessfully!';
          this.auth.user?.id && this.timeoffService.getTimeoffrequestsByUid(this.auth.user?.id)
            .subscribe(res => {
              this.timeoffrequests = res;
              this.tableData = this.timeoffrequests?.map(element => {
              var id = element.id,
                start = element.start,
              end = element.end,
              reason = element.reason,
              status = element.status;
              return {id, start, end, reason, status}
              });
            });
          this.router.navigate(['/timeoff']).catch();
          }
        })
  }

  removeHandler(id: number): void{
    this.timeoffService.removeTimeoffrequests(id)
      .subscribe(res =>{
        if(res.success){
          this.auth.user?.id && this.timeoffService.getTimeoffrequestsByUid(this.auth.user?.id)
          .subscribe(res => {
            this.timeoffrequests = res;
            this.tableData = this.timeoffrequests?.map(element => {
            var id = element.id,
              start = element.start,
            end = element.end,
            reason = element.reason,
            status = element.status;
            return {id, start, end, reason, status}
            });
          });
        this.router.navigate(['/timeoff']).catch();
        }
      });
  }
}
