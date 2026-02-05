import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { FlowerFilter } from './flickr.service';
import * as GalleryActions from './+state/gallery.actions';
import {
  selectPhotos,
  selectTotal,
  selectPage,
  selectPages,
  selectLoading,
  selectError
} from './+state/gallery.reducer';
import {
  selectDisplayedCount,
  selectCanLoadMore
} from './+state/gallery.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Flowers By Colour';

  private store = inject(Store);
  filters: { key: FlowerFilter; label: string }[] = [
    { key: 'all', label: 'All photos' },
    { key: 'red', label: 'Red photos' },
    { key: 'green', label: 'Green photos' },
    { key: 'blue', label: 'Blue photos' }
  ];

  // Selected filter
  selectedFilter: FlowerFilter = 'all';

  // NgRx selectors (as observables)
  photos$ = this.store.select(selectPhotos);
  total$ = this.store.select(selectTotal);
  page$ = this.store.select(selectPage);
  pages$ = this.store.select(selectPages);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  displayedCount$ = this.store.select(selectDisplayedCount);
  canLoadMore$ = this.store.select(selectCanLoadMore);

  colorClass: Record<FlowerFilter, string> = {
    all:   'bg-chip-active border-accent text-text ring-1 ring-accent/40',
    red:   'bg-red-600/20   border-red-400   text-red-300   ring-1 ring-red-400/40',
    green: 'bg-green-600/20 border-green-400 text-green-300 ring-1 ring-green-400/40',
    blue:  'bg-blue-600/20  border-blue-400  text-blue-300  ring-1 ring-blue-400/40'
  };

  ngOnInit(): void {
    // Initial load: 'all' flowers (triggers effects → page 1)
    this.store.dispatch(GalleryActions.setFilter({ filter: 'all' }));
  }

  onFilterClick(filter: FlowerFilter): void {
    if (this.selectedFilter === filter) return;
    this.selectedFilter = filter;
    this.store.dispatch(GalleryActions.setFilter({ filter }));
  }

  onMore(): void {
    this.store.dispatch(GalleryActions.loadMore());
  }

  onReload(): void {
    this.store.dispatch(GalleryActions.reload());
  }
}