import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import * as GalleryActions from './+state/gallery.actions';
import {
  selectPhotos,
  selectTotal,
  selectPage,
  selectPages,
  selectLoading,
  selectError,
} from './+state/gallery.reducer';
import {
  selectDisplayedCount,
  selectCanLoadMore,
} from './+state/gallery.selectors';
import { firstValueFrom } from 'rxjs';

describe('AppComponent (Jest + NgRx MockStore)', () => {
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectPhotos, []);
    store.overrideSelector(selectTotal, 0);
    store.overrideSelector(selectPage, 1);
    store.overrideSelector(selectPages, 1);
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectError, null);
    store.overrideSelector(selectDisplayedCount, 0);
    store.overrideSelector(selectCanLoadMore, false);

    dispatchSpy = jest.spyOn(store as unknown as Store, 'dispatch');
  });

  function create() {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    return { fixture, component };
  }

  it('should create the component', () => {
    const { component } = create();
    expect(component).toBeTruthy();
  });

  it("ngOnInit should dispatch setFilter('all')", () => {
    const { component } = create();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      GalleryActions.setFilter({ filter: 'all' })
    );
  });

  it('onFilterClick should NOT dispatch when clicking the same filter', () => {
    const { component } = create();
    jest.clearAllMocks();

    component.onFilterClick('all');

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(component.selectedFilter).toBe('all');
  });

  it('onFilterClick should update selectedFilter and dispatch setFilter for a new filter', () => {
    const { component } = create();
    jest.clearAllMocks();

    component.onFilterClick('red');

    expect(component.selectedFilter).toBe('red');
    expect(dispatchSpy).toHaveBeenCalledWith(
      GalleryActions.setFilter({ filter: 'red' })
    );
  });

  it('onMore should dispatch loadMore', () => {
    const { component } = create();

    component.onMore();

    expect(dispatchSpy).toHaveBeenCalledWith(GalleryActions.loadMore());
  });

  it('onReload should dispatch reload', () => {
    const { component } = create();

    component.onReload();

    expect(dispatchSpy).toHaveBeenCalledWith(GalleryActions.reload());
  });

  it('observables should emit the mocked selector values', async () => {
    const { component } = create();

    const [photos, total, page, pages, loading, error, displayed, canMore] =
      await Promise.all([
        firstValueFrom(component.photos$),
        firstValueFrom(component.total$),
        firstValueFrom(component.page$),
        firstValueFrom(component.pages$),
        firstValueFrom(component.loading$),
        firstValueFrom(component.error$),
        firstValueFrom(component.displayedCount$),
        firstValueFrom(component.canLoadMore$),
      ]);

    expect(photos).toEqual([]);
    expect(total).toBe(0);
    expect(page).toBe(1);
    expect(pages).toBe(1);
    expect(loading).toBe(false);
    expect(error).toBeNull();
    expect(displayed).toBe(0);
    expect(canMore).toBe(false);
  });

  it('colorClass should contain expected chip classes for each filter', () => {
    const { component } = create();

    expect(component.colorClass.all).toContain('bg-chip-active');
    expect(component.colorClass.red).toContain('bg-red-600/20');
    expect(component.colorClass.green).toContain('bg-green-600/20');
    expect(component.colorClass.blue).toContain('bg-blue-600/20');
  });
});