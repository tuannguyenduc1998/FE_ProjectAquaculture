import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'record-active',
        pathMatch: 'full',
      },
      {
        path: 'data-source',
        loadChildren: () => import('./data-source/data-source.module').then(mod => mod.DataSourceModule)
      },
      {
        path: 'management-user',
        loadChildren: () => import('./management-user/management-user.module').then(mod => mod.ManagementUserModule)
      },
      {
        path: 'record-active',
        loadChildren: () => import('./record-active/record-active.module').then(mod => mod.RecordActiveModule)
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
