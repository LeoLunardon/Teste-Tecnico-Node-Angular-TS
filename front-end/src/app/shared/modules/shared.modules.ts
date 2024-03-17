import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzMenuModule,
    NzModalModule,
    NzSelectModule,
    FormsModule,
    NzDatePickerModule,
    NzNotificationModule,
    NzTagModule,
    NzIconModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzMenuModule,
    NzModalModule,
    NzSelectModule,
    FormsModule,
    NzDatePickerModule,
    NzNotificationModule,
    NzTagModule,
    NzIconModule,
  ],
})
export class SharedModule {}
