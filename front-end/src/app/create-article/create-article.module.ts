import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CreateArticleComponent } from 'src/app/create-article/components/create-article/create-article.component';
import { ArticleFormModule } from 'src/app/shared/modules/article-form/article-form.module';
import { CreateArticleService } from 'src/app/create-article/services/create-article.service';

import { CreateArticleEffect } from 'src/app/create-article/store/effects/createArticle.effect';

import { reducers } from 'src/app/create-article/store/reducer';

const routes: Routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducers),
  ],
  providers: [CreateArticleService],
})
export class CreateArticleModule {}
