import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GalleryActions from './gallery.actions';
import { FlickrService } from '../flickr.service';
import { Store } from '@ngrx/store';
import { selectFilter, selectPage } from './gallery.reducer';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';  

@Injectable()
export class GalleryEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private flickr = inject(FlickrService);


  setFilterLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.setFilter),
      switchMap(() =>
        of(GalleryActions.loadPage({ page: 1, append: false }))
      )
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.loadMore),
      concatLatestFrom(() => this.store.select(selectPage)),
      map(([, page]) => GalleryActions.loadPage({ page: page + 1, append: true }))
    )
  );


  reload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.reload),
      map(() => GalleryActions.loadPage({ page: 1, append: false }))
    )
  );


  fetchPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.loadPage),
      concatLatestFrom(() => this.store.select(selectFilter)),
      switchMap(([{ page, append }, filter]) =>
        this.flickr.searchFlowers(filter, page).pipe(
          map(res => GalleryActions.loadPageSuccess({
            photos: res.photos,
            page: res.page,
            pages: res.pages,
            total: res.total,
            append
          })),
          catchError(err =>
            of(GalleryActions.loadPageFailure({ error: err?.message ?? 'Flickr API error' }))
          )
        )
      )
    )
  );
}