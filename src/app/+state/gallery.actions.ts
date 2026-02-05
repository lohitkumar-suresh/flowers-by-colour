import { createAction, props } from '@ngrx/store';
import { PhotoViewModel } from '../flickr.types';
import { FlowerFilter } from '../flickr.service';

export const setFilter = createAction(
  '[Gallery] Set Filter',
  props<{ filter: FlowerFilter }>()
);

export const loadPage = createAction(
  '[Gallery] Load Page',
  props<{ page: number; append: boolean }>()
);

export const loadPageSuccess = createAction(
  '[Gallery] Load Page Success',
  props<{ photos: PhotoViewModel[]; page: number; pages: number; total: number; append: boolean }>()
);

export const loadPageFailure = createAction(
  '[Gallery] Load Page Failure',
  props<{ error: string }>()
);

export const loadMore = createAction('[Gallery] Load More'); 
export const reload = createAction('[Gallery] Reload');