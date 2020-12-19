import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/component/base-component';
import { Router } from '@angular/router';
import { UserLoginService } from '../shared/services/user-login.service'; 
import { Area } from '../shared/models/master-data/area.model';
import { PagePagination } from '../shared/models/master-data/page-pagination.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit { 

  constructor() {}
  ngOnInit() {
    
  }

}
