import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { GALLERY_FEATURE_KEY, galleryReducer } from './+state/gallery.reducer';
import { GalleryEffects } from './+state/gallery.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(),
    provideEffects(),
    
 provideStore({ [GALLERY_FEATURE_KEY]: galleryReducer }),
    provideEffects([GalleryEffects]),
    provideStoreDevtools({ maxAge: 25 })
],
};
