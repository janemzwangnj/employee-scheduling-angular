import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddassociateComponent } from './addassociate/addassociate.component';
import { AssociatesComponent } from './associates/associates.component';
import { ChangestatusComponent } from './changestatus/changestatus.component';
import { ClockinoutComponent } from './clockinout/clockinout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModifytimecardComponent } from './modifytimecard/modifytimecard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RequestsComponent } from './requests/requests.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HrGuard } from './shared/guards/hr.guard';
import { ManagerGuard } from './shared/guards/manager.guard';
import { TimecardsComponent } from './timecards/timecards.component';
import { TimeoffComponent } from './timeoff/timeoff.component';
import { WorksheetComponent } from './worksheet/worksheet.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'worksheet',
    canActivate: [AuthGuard],
    component: WorksheetComponent
  },
  {
    path:'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path:'timecards',
    canActivate: [AuthGuard],
    component: TimecardsComponent
  },
  {
    path:'timeoff',
    canActivate: [AuthGuard],
    component: TimeoffComponent
  },
  {
    path:'clockinout',
    //canActivate: [AuthGuard],
    component: ClockinoutComponent
  },
  {
    path:'scheduling',
    canActivate: [HrGuard],
    component: SchedulingComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  // {
  //   path: 'associate',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./associate/associate.module').then(m => m.AssociateModule)
  // },
  {
    path: 'hr-associate',
    canActivate: [AuthGuard, HrGuard],
    loadChildren: () => import('./hr-associate/hr-associate.module').then(m => m.HrAssociateModule)
  },
  {
    path:'associates',
    canActivate: [HrGuard],
    component: AssociatesComponent
  },
  {
    path:'changestatus',
    canActivate: [HrGuard],
    component: ChangestatusComponent
  },
  {
    path:'modifytimecard',
    canActivate: [HrGuard],
    component: ModifytimecardComponent
  },
  {
    path:'requests',
    canActivate: [HrGuard],
    component: RequestsComponent
  },
  {
    path:'scheduling',
    canActivate: [HrGuard],
    component: SchedulesComponent
  },

  {
    path:'**',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
