import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmingLocationRoutingModule } from './farming-location-routing.module';
import { FarmingLocationComponent } from './farming-location.component';
import { FarmingLocationListComponent } from './farming-location-list/farming-location-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FarmingLocationComponent, FarmingLocationListComponent],
  imports: [
    CommonModule,
    FarmingLocationRoutingModule,
    SharedModule
  ]
})
export class FarmingLocationModule { }
