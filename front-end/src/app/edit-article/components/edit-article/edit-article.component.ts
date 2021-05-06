import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { editArticleAction } from 'src/app/edit-article/store/actions/editArticle.action';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import {
  getArticleAction,
  getArticleFailureAction,
} from 'src/app/edit-article/store/actions/getArticle.action';

import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/edit-article/store/selectors';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleInputInterface>;
  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  slug: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(editArticleAction({ slug: this.slug, articleInput }));
  }

  fetchData(): void {
    this.store.dispatch(getArticleFailureAction());
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }
}
