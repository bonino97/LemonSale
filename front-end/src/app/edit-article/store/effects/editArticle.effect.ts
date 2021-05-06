import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  editArticleAction,
  editArticleSuccessAction,
  editArticleFailureAction,
} from 'src/app/edit-article/store/actions/editArticle.action';

import { EditArticleService } from 'src/app/edit-article/services/edit-article.service';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class EditArticleEffect {
  editArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleAction),
      switchMap(({ slug, articleInput }) =>
        this.editArticleService.editArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return editArticleSuccessAction({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(editArticleFailureAction({ errors: errorResponse.error.errors }))
          )
        )
      )
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}
}
