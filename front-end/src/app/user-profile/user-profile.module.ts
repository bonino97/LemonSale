import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserProfileComponent } from 'src/app/user-profile/components/user-profile/user-profile.component';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { GetUserProfileEffect } from 'src/app/user-profile/store/effects/getUserProfile.effect';
import { reducers } from 'src/app/user-profile/store/reducer';
import { FeedModule } from 'src/app/shared/modules/feed/feed.module';

const routes: Routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent,
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent,
  },
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule,
  ],
  providers: [UserProfileService],
})
export class UserProfileModule {}
