import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = " MSI - Scheduling System";

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
