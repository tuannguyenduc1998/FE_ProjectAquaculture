import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserCreateComponent,
    UserEditComponent,
    UserComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
