import { Action, createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from 'src/app/auth/store/actions/login.action';

import {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from 'src/app/auth/store/actions/register.action';

import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction,
} from 'src/app/auth/store/actions/getCurrentUser.action';

import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/updateCurrentUser.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null,
};

const authReducer = createReducer(
  initialState,
  // Register Actions
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  // Login Actions
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  // Get Current User Actions
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  // Update Current User Actions
  on(
    updateCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      ...initialState,
      isLoggedIn: false,
    })
  )
);

export function authReducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
