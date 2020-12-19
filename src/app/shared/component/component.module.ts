import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule, NzFormModule } from 'ng-zorro-antd';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { HearderComponent } from './hearder/hearder.component';
import { ChangePasswordPopupComponent } from './popups/change-password-popup/change-password-popup.component';
import { ConfirmPopupComponent } from './popups/confirm-popup/confirm-popup.component';
import { FarmingLocationPopupComponent } from './popups/farming-location-popup/farming-location-popup.component';
import { NotificationPopupComponent } from './popups/notification-popup/notification-popup.component';
import { ChangeUserGroupPopupComponent } from './popups/change-user-group-popup/change-user-group-popup.component';
import { CreatePasswordPopupComponent } from './popups/create-password-popup/create-password-popup.component';
import { WorkHistoryPopupComponent } from './popups/work-history-popup/work-history-popup.component';
import { ImagePopupComponent } from './popups/image-popup/image-popup.component';
@NgModule({
  declarations: [
    HearderComponent,
    ChangePasswordPopupComponent,
    ConfirmPopupComponent,
    ChangeUserGroupPopupComponent,
    FarmingLocationPopupComponent,
    NotificationPopupComponent,
    CreatePasswordPopupComponent,
    WorkHistoryPopupComponent,
    ImagePopupComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [DirectivesModule, PipesModule, HearderComponent, ImagePopupComponent],
  entryComponents: [
    ChangePasswordPopupComponent,
    ConfirmPopupComponent,
    FarmingLocationPopupComponent,
    NotificationPopupComponent,
    ChangeUserGroupPopupComponent,
    CreatePasswordPopupComponent,
    WorkHistoryPopupComponent,
    ImagePopupComponent
  ],
})
export class ComponentModule { }
