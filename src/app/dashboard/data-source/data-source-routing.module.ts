import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Model } from '@carbon/charts/interfaces/events';
import { DataSourceComponent } from './data-source.component';

const routes: Routes = [
  {
    path: '',
    component: DataSourceComponent,
    children: [
      {
        path: 'farming-location',
        loadChildren: () => import('./farming-location/farming-location.module').then( mod => mod.FarmingLocationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataSourceRoutingModule { }
