import { createSelector } from '@ngrx/store';
import { galleryFeature } from './gallery.reducer';

export const {
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

export const selectDisplayedCount = createSelector(
  selectPhotos,
  (photos) => photos.length
);

export const selectCanLoadMore = createSelector(
  selectPage,
  selectPages,
  selectLoading,
  (page, pages, loading) => !loading && page < pages
);
``