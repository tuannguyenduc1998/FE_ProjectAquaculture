import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementUserRoutingModule } from './management-user-routing.module';
import { ManagementUserComponent } from './management-user.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ManagementUserComponent],
  imports: [
    CommonModule,
    ManagementUserRoutingModule,
    SharedModule
  ]
})
export class ManagementUserModule { }
