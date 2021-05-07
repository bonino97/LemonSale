import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';

import {
  updateCurrentUserAction,
  updateCurrentUserSuccessAction,
  updateCurrentUserFailureAction,
} from 'src/app/auth/store/actions/updateCurrentUser.action';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateCurrentUserEffect {
  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({ currentUserInput }) =>
        this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateCurrentUserSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              updateCurrentUserFailureAction({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
