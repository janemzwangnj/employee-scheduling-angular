import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Timecards } from '../shared/models/timecards.model';
import { ClockinoutService } from '../shared/services/clockinout.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-clockinout',
  templateUrl: './clockinout.component.html',
  styleUrls: ['./clockinout.component.scss']
})
export class ClockinoutComponent implements OnInit {
  text: string = '';
  punchIn: string = '';
  missingPunch: string = '';

  start: number = 0;
  end: number = 0;
  start_time: string = '';
  end_time: string = '';
  eid: string = '';

  constructor(
    private clockService: ClockinoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  tiles: Tile[] = [
    {text: '7', cols: 1, rows: 1, color: 'lightblue'},
    {text: '8', cols: 1, rows: 1, color: 'lightblue'},
    {text: '9', cols: 1, rows: 1, color: 'lightblue'},
    {text: '4', cols: 1, rows: 1, color: 'lightblue'},
    {text: '5', cols: 1, rows: 1, color: 'lightblue'},
    {text: '6', cols: 1, rows: 1, color: 'lightblue'},
    {text: '1', cols: 1, rows: 1, color: 'lightblue'},
    {text: '2', cols: 1, rows: 1, color: 'lightblue'},
    {text: '3', cols: 1, rows: 1, color: 'lightblue'},
    {text: '0', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Clear', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Punch', cols: 3, rows: 1, color: '#rgb(24, 79, 98)'},
  ];

  clickHandler(text:string){
    var start_time: string = '',
        end_time: string = '',
        eid: string = ''; 

    this.punchIn='';
      this.missingPunch='';
    if(text==="Clear"){
        this.text='';
    }
    if(text !== 'Punch' && text !== 'Clear'){
      this.text = this.text + text;
    } 
    if(text === 'Punch'){
      eid = this.text;
      this.clockService.getEmployee(eid)
        .subscribe(res => {
          if(res === null){
            this.missingPunch = 'Check your employee ID!';
          }else {
            this.clockService.getTimecards(eid)
            .subscribe(res => {
              res.sort((a: { id: number; }, b: { id: number; })=>a.id - b.id)
              console.log(res);
            if(res.length && (new Date().getTime() - Number(res[res.length-1].start_time) < 1800000
              ||new Date().getTime() - Number(res[res.length-1].end_time) < 1800000)
              ){
                this.missingPunch = 'You can not punch in too soon!';
              } else {
                if(res.length&&res[res.length-1].end_time===''){
                  if (new Date(Number(res[res.length-1].start_time)).getDate() !== new Date().getDate()){
                    this.missingPunch = 'See managers! You had a missing punch!';
                    this.addtc(eid);
                  } else{
                    this.updatetc(eid);
                    }
                }else{
                this.addtc(eid);
              }
              }
            })
            this.text = '';
          }
        })
    }
  };

  addtc(eid: string){
      var start_time = new Date().getTime().toString(),
            end_time = '';
      this.clockService.addTimecards({start_time, end_time, eid})
        .subscribe( res => {
          if(res.success){
            this.punchIn = 'You clocked in sucessful!';
            this.router.navigate(['/clockinout']).catch();
            }
          }) 
  }

  updatetc(eid: string){
    var end_time = new Date().getTime().toString(),
        start_time = '' ;
    this.clockService.updateTimecards({start_time, end_time, eid})
      .subscribe(res =>{
          if(res.success){
            this.punchIn = 'You clocked out sucessfully!';
            this.router.navigate(['/clockinout']).catch();
            }
          })
  }
}

