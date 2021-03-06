import { select, Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { getArticleAction } from 'src/app/article/store/actions/getArticle.action';
import { deleteArticleAction } from 'src/app/article/store/actions/deleteArticle.action';

import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from 'src/app/article/store/selector';
import { currentUserSelector } from 'src/app/auth/store/selectors';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;

  article: ArticleInterface;
  articleSubscription$: Subscription;

  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValue();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.articleSubscription$.unsubscribe();
  }

  initializeValue(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));

    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false;
          }

          return article.author.username === currentUser.username;
        }
      )
    );
  }

  initializeListeners(): void {
    this.articleSubscription$ = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
