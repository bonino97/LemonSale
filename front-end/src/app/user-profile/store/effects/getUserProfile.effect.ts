import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { UserProfileInterface } from 'src/app/user-profile/types/userProfile.interface';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from 'src/app/user-profile/store/actions/userProfile.action';

@Injectable({
  providedIn: 'root',
})
export class GetUserProfileEffect {
  getUserProfileEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({ slug }) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) => {
            return getUserProfileSuccessAction({ userProfile });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getUserProfileFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}
}
