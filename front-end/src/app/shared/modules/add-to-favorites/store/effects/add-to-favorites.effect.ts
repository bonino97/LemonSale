import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AddToFavoritesService } from 'src/app/shared/modules/add-to-favorites/services/add-to-favorites.service';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

import {
  addToFavoritesAction,
  addToFavoritesSuccessAction,
  addToFavoritesFailureAction,
} from 'src/app/shared/modules/add-to-favorites/store/actions/add-to-favorites.action';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesEffect {
  addToFavoritesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.addToFavorites(slug)
          : this.addToFavoritesService.removeFromFavorites(slug);
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(addToFavoritesFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService
  ) {}
}
