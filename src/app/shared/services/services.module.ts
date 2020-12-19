import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalService, NzI18nService } from 'ng-zorro-antd';
import { ApplicationService } from './aplication.service';
import { AuthenticationService } from './authentication.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApplicationService,
    NzModalService,
    NzI18nService,
    AuthenticationService
  ]
})
export class ServicesModule { }
