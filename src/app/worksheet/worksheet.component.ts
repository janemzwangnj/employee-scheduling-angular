import { Component, OnInit } from '@angular/core';
import { Worksheet } from '../shared/models/worksheet.model';
import { AuthService } from '../shared/services/auth.service';
import { WorksheetService } from '../shared/services/worksheet.service';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit {
  Number091122: number = 1662955199000;
  NumberOfWeek: number = 604800000;
  NumberOfDay: number = 86400000;
  weekTotal: any[] = [];

  constructor(
    private auth: AuthService,
    private worksheetService: WorksheetService
  ) { }

  // ngOnInit(): void {
  // }

  ngOnInit(): void {
    console.log(this.auth.user);
    var title = '';
    var worksheets: Worksheet[];
    var currentWeekend = this.currentWeekend();
    console.log(new Date(currentWeekend));
        this.worksheetService.getWorksheetByUid(this.auth.user!.id!)
          .subscribe(res => {
            for(let i=1; i<5; i++){
              title = this.createTitle(currentWeekend+(i-1)*this.NumberOfWeek);
              worksheets = res;
              var totalTime =worksheets.filter( element =>Number(element.start_time) < currentWeekend+(i-1)*this.NumberOfWeek && Number(element.start_time) >currentWeekend + i*this.NumberOfWeek)
                                  .reduce((preVal:number, element:Worksheet)=> {
                                    if(element.end_time){
                                      return preVal + Number(element.end_time) - Number(element.start_time)
                                    } else {
                                      return preVal;
                                    }
                                  }, 0);
              let weekObect = {index: i-1, title: '', time: '', mon:'', tue:'', wen:'', thu:'', fri:'', sat:'', sun:''};
              weekObect.title = title;
              weekObect.time = this.convertMsToTime(totalTime);
            
              var worksheets1 = worksheets.filter( element =>Number(element.start_time) < currentWeekend+i*this.NumberOfWeek+this.NumberOfDay && Number(element.start_time) >currentWeekend+i*this.NumberOfWeek);
              weekObect.mon = this.createDayInfo(currentWeekend+(i-1)*this.NumberOfWeek, worksheets1);

              var worksheets2 = worksheets.filter( element =>Number(element.start_time) < (currentWeekend+i*this.NumberOfWeek+2*this.NumberOfDay) && Number(element.start_time) > (currentWeekend + i*this.NumberOfWeek+this.NumberOfDay));
              weekObect.tue = this.createDayInfo(currentWeekend+(i-1)*this.NumberOfWeek+this.NumberOfDay, worksheets2);

              var worksheets3 = worksheets.filter( element =>Number(element.start_time) < currentWeekend+i*this.NumberOfWeek+3*this.NumberOfDay && Number(element.start_time) >currentWeekend + i*this.NumberOfWeek+2*this.NumberOfDay);
              weekObect.wen = this.createDayInfo(currentWeekend+(i-1)*this.NumberOfWeek+2*this.NumberOfDay, worksheets3);

              var worksheets4 = worksheets.filter( element =>Number(element.start_time) < currentWeekend+i*this.NumberOfWeek+4*this.NumberOfDay && Number(element.start_time) >currentWeekend + i*this.NumberOfWeek+3*this.NumberOfDay);
              weekObect.thu = this.createDayInfo(currentWeekend+i*this.NumberOfWeek+3*this.NumberOfDay, worksheets4);

              var worksheets5 = worksheets.filter( element =>Number(element.start_time) < currentWeekend+i*this.NumberOfWeek+5*this.NumberOfDay && Number(element.start_time) >currentWeekend + i*this.NumberOfWeek+4*this.NumberOfDay);
              weekObect.fri = this.createDayInfo(currentWeekend+(i-1)*this.NumberOfWeek+4*this.NumberOfDay, worksheets5);

              var worksheets6 = worksheets.filter( element =>Number(element.start_time) < currentWeekend+i*this.NumberOfWeek+6*this.NumberOfDay && Number(element.start_time) >currentWeekend + i*this.NumberOfWeek+5*this.NumberOfDay);
              weekObect.sat = this.createDayInfo(currentWeekend+(i-1)*this.NumberOfWeek+5*this.NumberOfDay, worksheets6);

              var worksheets7 = worksheets.filter( element =>Number(element.start_time) < currentWeekend+i*this.NumberOfWeek+7*this.NumberOfDay && Number(element.start_time) >currentWeekend + i*this.NumberOfWeek+6*this.NumberOfDay);
              weekObect.sun = this.createDayInfo(currentWeekend+(i-1)*this.NumberOfWeek+6*this.NumberOfDay, worksheets7);
              this.weekTotal.push(weekObect);
            };
            console.log(this.weekTotal);
          })
  }

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
    var nextWeekend: string[] = new Date(currentWeekend+this.NumberOfWeek-4000).toString().split(' ');
    var curWeekend: string[] = new Date(currentWeekend+this.NumberOfDay).toString().split(' ');
    if(nextWeekend[1]===curWeekend[1]){
      title = curWeekend[1]+' '+curWeekend[2]+' - '+nextWeekend[2]+', '+curWeekend[3];
    } else if(nextWeekend[3]===curWeekend[3]){
      title = curWeekend[1]+' '+curWeekend[2]+' - '+nextWeekend[1]+' '+nextWeekend[2]+', '+curWeekend[3];
    } else {
      title = curWeekend[1]+' '+curWeekend[2]+', '+curWeekend[3] +' - '+nextWeekend[1]+' '+nextWeekend[2]+', '+nextWeekend[3];
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

  createDayInfo(dayTimestamp:number, arrWorksheets: Worksheet[]): string {
    var dayInfo: string ='';
    var arr: string[] = new Date(dayTimestamp+4000).toString().split(' ').slice(0,3);
    dayInfo = arr[0]+' '+arr[1]+' '+arr[2]+': ';
    dayInfo = arrWorksheets.reduce((preVal:string, element:Worksheet) => {
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
