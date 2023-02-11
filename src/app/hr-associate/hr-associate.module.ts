import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrAssociateHomeComponent } from './hr-associate-home/hr-associate-home.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { TimecardComponent } from './timecard/timecard.component';
import { StatusComponent } from './status/status.component';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { ManagerGuard } from '../shared/guards/manager.guard';

const routes: Routes = [
  {
    path: '',
    component: HrAssociateHomeComponent,
    children: [
      {
        path: 'scheduling',
        component: SchedulingComponent
      },
      {
        path: 'status',
        component: StatusComponent
      },
      {
        path: 'timecard',
        component: TimecardComponent
      },
      {
        path: 'request',
        canActivate: [ManagerGuard],
        component: RequestComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    HrAssociateHomeComponent,
    SchedulingComponent,
    TimecardComponent,
    StatusComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HrAssociateModule { }
