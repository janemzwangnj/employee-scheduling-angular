import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeHomeComponent } from './prime-home/prime-home.component';
import { VideoComponent } from './video/video.component';
import { MusicComponent } from './music/music.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PrimeHomeComponent,
    children: [
      {
        path: 'music',
        component: MusicComponent
      },
      {
        path: 'video',
        component: VideoComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    PrimeHomeComponent,
    VideoComponent,
    MusicComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PrimeModule { }
