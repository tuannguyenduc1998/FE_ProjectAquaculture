import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmingLocationListComponent } from './farming-location-list/farming-location-list.component';
import { FarmingLocationComponent } from './farming-location.component';

const routes: Routes = [
  {
    path: '',
    component: FarmingLocationComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: FarmingLocationListComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmingLocationRoutingModule { }
