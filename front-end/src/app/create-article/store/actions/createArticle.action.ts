import { createAction, props } from '@ngrx/store';

import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ActionTypes } from 'src/app/create-article/store/actionTypes';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ articleInput: ArticleInputInterface }>()
);

export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
