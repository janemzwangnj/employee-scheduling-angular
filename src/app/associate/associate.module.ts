import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerequestComponent } from './timerequest/timerequest.component';
import { HomeComponent } from './home/home.component';
import { CheckinoutComponent } from './checkinout/checkinout.component';
import { ProfileComponent } from './profile/profile.component';
import { WorksheetComponent } from './worksheet/worksheet.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'checkinout',
        component: CheckinoutComponent
      },
      {
        path: 'timerequest',
        component: TimerequestComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'worksheet',
        component: WorksheetComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    TimerequestComponent,
    HomeComponent,
    CheckinoutComponent,
    ProfileComponent,
    WorksheetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AssociateModule { }
