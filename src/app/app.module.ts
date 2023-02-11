import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { CustomStyleModule } from './shared/modules/custom-style/custom-style.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { TimeoffComponent } from './timeoff/timeoff.component';
import { ProfileComponent } from './profile/profile.component';
import { WorksheetComponent } from './worksheet/worksheet.component';
import { TimecardsComponent } from './timecards/timecards.component';
import { ClockinoutComponent } from './clockinout/clockinout.component';
import { RequestsComponent } from './requests/requests.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { ChangestatusComponent } from './changestatus/changestatus.component';
import { ModifytimecardComponent } from './modifytimecard/modifytimecard.component';
import { AddassociateComponent } from './addassociate/addassociate.component';
import { AssociatesComponent } from './associates/associates.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SchedulesComponent,
    RegisterComponent,
    TimeoffComponent,
    ProfileComponent,
    WorksheetComponent,
    TimecardsComponent,
    ClockinoutComponent,
    RequestsComponent,
    SchedulingComponent,
    ChangestatusComponent,
    ModifytimecardComponent,
    AddassociateComponent,
    AssociatesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomStyleModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
