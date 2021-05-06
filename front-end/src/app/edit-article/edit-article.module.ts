import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EditArticleComponent } from 'src/app/edit-article/components/edit-article/edit-article.component';
import { ArticleFormModule } from 'src/app/shared/modules/article-form/article-form.module';
import { EditArticleService } from 'src/app/edit-article/services/edit-article.service';
import { EditArticleEffect } from 'src/app/edit-article/store/effects/editArticle.effect';
import { reducers } from 'src/app/edit-article/store/reducer';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { GetArticleEffect } from 'src/app/edit-article/store/effects/getArticle.effect';
import { ArticleService as SharedArticleService } from 'src/app/article/services/article.service';

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    EffectsModule.forFeature([EditArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
    ArticleFormModule,
  ],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
