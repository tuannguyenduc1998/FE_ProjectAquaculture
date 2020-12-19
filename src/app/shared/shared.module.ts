import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './component/component.module';
import { NgZorroAntdModule, NzI18nService, NzTableModule, NzEmptyModule, NzBadgeModule, NzDropDownModule } from 'ng-zorro-antd';
// import { ChartsModule } from '@carbon/charts-angular';
import { ChartsModule } from '@carbon/charts-angular';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    NgZorroAntdModule,
    NzTableModule,
    NzEmptyModule,
    NzBadgeModule,
    // ChartsModule,
    NzMenuModule,
    NzIconModule,
    NzNotificationModule,
    NzInputModule,
    NzDropDownModule,
    NzToolTipModule,
    NzTabsModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzCollapseModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTimePickerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    NgZorroAntdModule,
    NzTableModule,
    NzEmptyModule,
    NzBadgeModule,
    // ChartsModule,
    NzMenuModule,
    NzSelectModule,
    NzNotificationModule,
    NzToolTipModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzInputModule,
    NzTabsModule,
    NzDatePickerModule,
    NzIconModule,
    NzSwitchModule,
    NzCollapseModule,
    NzTimePickerModule
  ],
  providers: [NzI18nService],
})
export class SharedModule { }
