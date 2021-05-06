import { createAction, props } from '@ngrx/store';

import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ActionTypes } from 'src/app/edit-article/store/actionTypes';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';

export const editArticleAction = createAction(
  ActionTypes.EDIT_ARTICLE,
  props<{ slug: string; articleInput: ArticleInputInterface }>()
);

export const editArticleSuccessAction = createAction(
  ActionTypes.EDIT_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const editArticleFailureAction = createAction(
  ActionTypes.EDIT_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
