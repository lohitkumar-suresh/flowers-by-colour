import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlickrService, FlowerFilter } from './flickr.service';
import { PhotoViewModel } from './flickr.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Flowers By Colour';

  // UI state
  filters: { key: FlowerFilter; label: string }[] = [
    { key: 'all', label: 'All photos' },
    { key: 'red', label: 'Red photos' },
    { key: 'green', label: 'Green photos' },
    { key: 'blue', label: 'Blue photos' }
  ];

  selectedFilter: FlowerFilter = 'all';
  photos: PhotoViewModel[] = [];
  total = 0;
  page = 1;
  pages = 1;
  loading = false;
  error: string | null = null;

  constructor(private flickr: FlickrService) {}

  ngOnInit(): void {
    this.loadInitial();
  }

  private loadInitial(): void {
    this.page = 1;
    this.photos = [];
    this.total = 0;
    this.pages = 1;
    this.fetchPhotos({ append: false });
  }

  onFilterClick(filter: FlowerFilter): void {
    if (this.selectedFilter === filter) return;
    this.selectedFilter = filter;
    this.loadInitial();
  }

  onMore(): void {
    if (this.loading) return;
    if (this.page >= this.pages) return;
    this.page += 1;
    this.fetchPhotos({ append: true });
  }

  private fetchPhotos(opts: { append: boolean }): void {
    this.loading = true;
    this.error = null;

    this.flickr.searchFlowers(this.selectedFilter, this.page).subscribe({
      next: (res) => {
        this.total = res.total;
        this.pages = res.pages;
        if (opts.append) {
          this.photos = [...this.photos, ...res.photos];
        } else {
          this.photos = res.photos;
        }
      },
      error: (err) => {
        this.error = err?.message || 'Something went wrong. Please try again.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  get canLoadMore(): boolean {
    return !this.loading && this.page < this.pages;
  }

  get displayedCount(): number {
    return this.photos.length;
  }
}