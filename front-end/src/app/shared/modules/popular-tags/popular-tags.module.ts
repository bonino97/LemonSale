import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { PopularTagsComponent } from 'src/app/shared/modules/popular-tags/components/popular-tags/popular-tags.component';
import { PopularTagsService } from 'src/app/shared/modules/popular-tags/services/popular-tags.service';

import { GetPopularTagsEffect } from 'src/app/shared/modules/popular-tags/store/effects/getPopularTags.effect';
import { reducers } from 'src/app/shared/modules/popular-tags/store/reducers';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { ErrorMessageModule } from 'src/app/shared/modules/error-message/error-message.module';

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
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
