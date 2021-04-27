import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FeedComponent } from 'src/app/shared/modules/feed/components/feed/feed.component';
import { FeedService } from 'src/app/shared/modules/feed/services/feed.service';
import { GetFeedEffect } from 'src/app/shared/modules/feed/store/effects/getFeed.effect';
import { reducers } from 'src/app/shared/modules/feed/store/reducer';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from 'src/app/shared/modules/error-message/error-message.module';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { SharedPaginationModule } from 'src/app/shared/modules/pagination/pagination.module';
import { TagListModule } from 'src/app/shared/modules/tag-list/tag-list.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    SharedPaginationModule,
    TagListModule,
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
