import { createFeature, createReducer, on } from '@ngrx/store';
import * as GalleryActions from './gallery.actions';
import { FlowerFilter } from '../flickr.service';
import { PhotoViewModel } from '../flickr.types';

export const GALLERY_FEATURE_KEY = 'gallery';

export interface GalleryState {
  filter: FlowerFilter;
  page: number;
  pages: number;
  perPage: number;
  total: number;
  photos: PhotoViewModel[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  filter: 'all',
  page: 1,
  pages: 1,
  perPage: 20,
  total: 0,
  photos: [],
  loading: false,
  error: null
};

const reducer = createReducer(
  initialState,

  on(GalleryActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
    page: 1,
    pages: 1,
    total: 0,
    photos: [],
    loading: true,
    error: null
  })),

  on(GalleryActions.loadPage, (state, { page }) => ({
    ...state,
    page,
    loading: true,
    error: null
  })),

  on(GalleryActions.loadPageSuccess, (state, { photos, page, pages, total, append }) => ({
    ...state,
    page,
    pages,
    total,
    photos: append ? [...state.photos, ...photos] : photos,
    loading: false,
    error: null
  })),

  on(GalleryActions.loadPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const galleryFeature = createFeature({
  name: GALLERY_FEATURE_KEY,
  reducer
});

export const {
  name, // gallery
  reducer: galleryReducer,
  selectGalleryState,
  selectFilter,
  selectPage,
  selectPages,
  selectPerPage,
  selectTotal,
  selectPhotos,
  selectLoading,
  selectError
} = galleryFeature;