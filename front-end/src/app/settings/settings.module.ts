import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from 'src/app/settings/components/settings/settings.component';
import { reducers } from 'src/app/settings/store/reducer';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backend-error-messages/backend-error-messages.module';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers),
    BackendErrorMessagesModule,
  ],
})
export class SettingsModule {}
