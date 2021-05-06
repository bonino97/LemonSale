import { Action, createReducer, on } from '@ngrx/store';

import { EditArticleStateInterface } from 'src/app/edit-article/types/editArticleState.interface';
import {
  editArticleAction,
  editArticleFailureAction,
  editArticleSuccessAction,
} from 'src/app/edit-article/store/actions/editArticle.action';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from 'src/app/edit-article/store/actions/getArticle.action';

const initialState: EditArticleStateInterface = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

const editArticleReducer = createReducer(
  initialState,
  on(
    editArticleAction,
    (state): EditArticleStateInterface => ({ ...state, isSubmitting: true })
  ),
  on(
    editArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    editArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducers(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action);
}
