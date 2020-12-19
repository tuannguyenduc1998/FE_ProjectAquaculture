import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataSourceRoutingModule } from './data-source-routing.module';
import { DataSourceComponent } from './data-source.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DataSourceComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataSourceRoutingModule
  ]
})
export class DataSourceModule { }
