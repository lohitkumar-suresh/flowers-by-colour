import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { FlickrSearchResponse, PhotoViewModel, FlickrPhoto } from './flickr.types';

export type FlowerFilter = 'all' | 'red' | 'green' | 'blue';

@Injectable({ providedIn: 'root' })
export class FlickrService {
  private http = inject(HttpClient);

  private readonly baseUrl = environment.flickrBaseUrl;
  private readonly apiKey = environment.flickrApiKey;
  private readonly perPage = environment.perPage;

  private buildImageUrl(p: FlickrPhoto): string {
    // IMPORTANT: include the '/' between {server} and {id}
    return `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`;
  }

  private toViewModel(p: FlickrPhoto): PhotoViewModel {
    return {
      id: p.id,
      title: p.title || 'Flower',
      url: this.buildImageUrl(p),
      alt: p.title ? `Flower: ${p.title}` : 'Flower image'
    };
  }

  private getColorCode(filter: FlowerFilter): number | undefined {
    // Per requirement:
    // Red: 0, Green: 5, Blue: 8
    switch (filter) {
      case 'red': return 0;
      case 'green': return 5;
      case 'blue': return 8;
      default: return undefined; // 'all'
    }
  }

  searchFlowers(filter: FlowerFilter, page: number): Observable<{
    photos: PhotoViewModel[];
    page: number;
    pages: number;
    perPage: number;
    total: number;
  }> {
    let params = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('text', 'flowers')
      .set('api_key', this.apiKey)
      .set('format', 'json')
      .set('nojsoncallback', '1')
      .set('page', String(page))
      .set('per_page', String(this.perPage));

    const colorCode = this.getColorCode(filter);
    if (colorCode !== undefined) {
      params = params.set('color_codes', String(colorCode));
    }

    return this.http.get<FlickrSearchResponse>(this.baseUrl, { params }).pipe(
      map((res) => {
        if (res.stat !== 'ok') {
          throw new Error(res.message || 'Flickr API error');
        }
        const vm = res.photos.photo.map(p => this.toViewModel(p));
        return {
          photos: vm,
          page: res.photos.page,
          pages: res.photos.pages,
          perPage: res.photos.perpage,
          total: Number(res.photos.total) || 0
        };
      })
    );
  }
}