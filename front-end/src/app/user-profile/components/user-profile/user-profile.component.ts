import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
  isLoadingSelector,
  errorSelector,
  userProfileSelector,
} from 'src/app/user-profile/store/selector';
import { UserProfileInterface } from 'src/app/user-profile/types/userProfile.interface';
import { getUserProfileAction } from 'src/app/user-profile/store/actions/userProfile.action';
import { currentUserSelector } from 'src/app/auth/store/selectors';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: UserProfileInterface;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isCurrentUserProfile$: Observable<boolean>;
  userProfileSubscription$: Subscription;

  apiUrl: string;
  slug: string;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeListeners();
    this.initializeValues();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription$.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          UserProfileInterface
        ]) => {
          return currentUser.username === userProfile.username;
        }
      )
    );
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }

  initializeListeners(): void {
    this.userProfileSubscription$ = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: UserProfileInterface) => {
        this.userProfile = userProfile;
      });

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchUserProfile();
    });
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
