import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';

@Injectable({
  providedIn: 'root',
})
export class LogoutEffect {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistenceService.setItem('accessToken', '');
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}
}
