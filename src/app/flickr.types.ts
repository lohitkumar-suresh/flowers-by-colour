export interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
}

export interface FlickrPhotosPage {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: FlickrPhoto[];
}

export interface FlickrSearchResponse {
  photos: FlickrPhotosPage;
  stat: 'ok' | 'fail';
  code?: number;
  message?: string;
}

export interface PhotoViewModel {
  id: string;
  title: string;
  url: string;
  alt: string;
}