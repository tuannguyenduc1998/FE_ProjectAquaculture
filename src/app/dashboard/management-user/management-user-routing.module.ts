import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementUserComponent } from './management-user.component';

const routes: Routes = [{
  path: '',
  component: ManagementUserComponent,
  children: [
    {
      path: '',
      redirectTo: 'user',
      pathMatch: 'full'
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementUserRoutingModule { }
