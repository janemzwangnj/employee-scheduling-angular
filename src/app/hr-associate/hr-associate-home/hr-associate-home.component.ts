import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-hr-associate-home',
  templateUrl: './hr-associate-home.component.html',
  styleUrls: ['./hr-associate-home.component.scss']
})
export class HrAssociateHomeComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
