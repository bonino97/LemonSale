import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PopularTagsComponent } from 'src/app/shared/modules/popular-tags/components/popular-tags/popular-tags.component';

import { GetPopularTagsEffect } from 'src/app/shared/modules/popular-tags/store/effects/getPopularTags.effect';
import { reducers } from 'src/app/shared/modules/popular-tags/store/reducers';
import { LoadingModule } from '../loading/loading.module';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    LoadingModule,
    ErrorMessageModule,
  ],
  exports: [PopularTagsComponent],
})
export class PopularTagsModule {}
