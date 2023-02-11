import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timecards } from '../shared/models/timecards.model';
import { AuthService } from '../shared/services/auth.service';
import { ClockinoutService } from '../shared/services/clockinout.service';

@Component({
  selector: 'app-timecards',
  templateUrl: './timecards.component.html',
  styleUrls: ['./timecards.component.scss']
})
export class TimecardsComponent implements OnInit {
  timecards: Timecards[] | null= null;
  Number091122: number = 1662955199000;
  NumberOfWeek: number = 604800000;
  NumberOfDay: number = 86400000;
  weekTotal: any[] = [];

  constructor(
    private auth: AuthService,
    private clockService: ClockinoutService
  ) { }

  ngOnInit(): void {
    console.log(this.auth.user);
    var title = '';
    var timecards: Timecards[];
    var currentWeekend = this.currentWeekend();
    console.log(new Date(currentWeekend));
    this.auth.user?.id && this.clockService.getEmployeeByUid(this.auth.user.id)
      .subscribe(res => {
        this.clockService.getTimecards(res.eid)
          .subscribe(res => {
            for(let i=1; i<9; i++){
              title = this.createTitle(currentWeekend-(i-1)*this.NumberOfWeek);
              timecards = res;
              var totalTime =timecards.filter( element =>Number(element.start_time) < currentWeekend-(i-1)*this.NumberOfWeek && Number(element.start_time) >currentWeekend - i*this.NumberOfWeek)
                                  .reduce((preVal:number, element:Timecards)=> {
                                    if(element.end_time){
                                      return preVal + Number(element.end_time) - Number(element.start_time)
                                    } else {
                                      return preVal;
                                    }
                                  }, 0);
              let weekObect = {index: i-1, title: '', time: '', mon:'', tue:'', wen:'', thu:'', fri:'', sat:'', sun:''};
              weekObect.title = title;
              weekObect.time = this.convertMsToTime(totalTime);
            
              var timecards1 = timecards.filter( element =>Number(element.start_time) < currentWeekend-i*this.NumberOfWeek+this.NumberOfDay && Number(element.start_time) >currentWeekend - i*this.NumberOfWeek);
              weekObect.mon = this.createDayInfo(currentWeekend-i*this.NumberOfWeek, timecards1);

              var timecards2 = timecards.filter( element =>Number(element.start_time) < (currentWeekend-i*this.NumberOfWeek+2*this.NumberOfDay) && Number(element.start_time) > (currentWeekend - i*this.NumberOfWeek+this.NumberOfDay));
              weekObect.tue = this.createDayInfo(currentWeekend-i*this.NumberOfWeek+this.NumberOfDay, timecards2);

              var timecards3 = timecards.filter( element =>Number(element.start_time) < currentWeekend-i*this.NumberOfWeek+3*this.NumberOfDay && Number(element.start_time) >currentWeekend - i*this.NumberOfWeek+2*this.NumberOfDay);
              weekObect.wen = this.createDayInfo(currentWeekend-i*this.NumberOfWeek+2*this.NumberOfDay, timecards3);

              var timecards4 = timecards.filter( element =>Number(element.start_time) < currentWeekend-i*this.NumberOfWeek+4*this.NumberOfDay && Number(element.start_time) >currentWeekend - i*this.NumberOfWeek+3*this.NumberOfDay);
              weekObect.thu = this.createDayInfo(currentWeekend-i*this.NumberOfWeek+3*this.NumberOfDay, timecards4);

              var timecards5 = timecards.filter( element =>Number(element.start_time) < currentWeekend-i*this.NumberOfWeek+5*this.NumberOfDay && Number(element.start_time) >currentWeekend - i*this.NumberOfWeek+4*this.NumberOfDay);
              weekObect.fri = this.createDayInfo(currentWeekend-i*this.NumberOfWeek+4*this.NumberOfDay, timecards5);

              var timecards6 = timecards.filter( element =>Number(element.start_time) < currentWeekend-i*this.NumberOfWeek+6*this.NumberOfDay && Number(element.start_time) >currentWeekend - i*this.NumberOfWeek+5*this.NumberOfDay);
              weekObect.sat = this.createDayInfo(currentWeekend-i*this.NumberOfWeek+5*this.NumberOfDay, timecards6);

              var timecards7 = timecards.filter( element =>Number(element.start_time) < currentWeekend-i*this.NumberOfWeek+7*this.NumberOfDay && Number(element.start_time) >currentWeekend - i*this.NumberOfWeek+6*this.NumberOfDay);
              weekObect.sun = this.createDayInfo(currentWeekend-i*this.NumberOfWeek+6*this.NumberOfDay, timecards7);
              this.weekTotal.push(weekObect);
            };
            console.log(this.weekTotal);
          })
      })
  }

  viewHandler(index: number){}
  
  currentWeekend():number {
    var currentWeekend = this.Number091122,
        today = new Date().getTime();
    while(today > currentWeekend){
      currentWeekend += this.NumberOfWeek;
    }
    return currentWeekend;
  }

  createTitle(currentWeekend: number): string {
    var title = '';
    var preWeekend: string[] = new Date(currentWeekend-this.NumberOfWeek+4000).toString().split(' ');
    var curWeekend: string[] = new Date(currentWeekend).toString().split(' ');
    if(preWeekend[1]===curWeekend[1]){
      title = curWeekend[1]+' '+preWeekend[2]+' - '+curWeekend[2]+', '+curWeekend[3];
    } else if(preWeekend[3]===curWeekend[3]){
      title = preWeekend[1]+' '+preWeekend[2]+' - '+curWeekend[1]+' '+curWeekend[2]+', '+curWeekend[3];
    } else {
      title = preWeekend[1]+' '+preWeekend[2]+', '+preWeekend[3] +' - '+curWeekend[1]+' '+curWeekend[2]+', '+curWeekend[3];
    }
    return title
  }

  padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }

  convertMsToTime(milliseconds:number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}`;
  }

  createDayInfo(dayTimestamp:number, arrTimecards: Timecards[]): string {
    var dayInfo: string ='';
    var arr: string[] = new Date(dayTimestamp+4000).toString().split(' ').slice(0,3);
    dayInfo = arr[0]+' '+arr[1]+' '+arr[2]+': ';
    dayInfo = arrTimecards.reduce((preVal:string, element:Timecards) => {
      if(element.end_time){
        return preVal + ' IN: '+ new Date(Number(element.start_time)).toString().split(' ')[4].slice(0,5) + 
      ' <-> OUT: '+ new Date(Number(element.end_time)).toString().split(' ')[4].slice(0,5) 
      } else {
        return preVal + ' IN: '+ new Date(Number(element.start_time)).toString().split(' ')[4].slice(0,5) + ' '
      };
    }, dayInfo);
    return dayInfo;
  }
}
