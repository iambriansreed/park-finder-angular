import { IStoreService, LatLng, IPark, IAppState } from './models';
import { SET_PARKS, SET_ORIGIN } from './state.reducers';
import { Store } from '@ngrx/store';

export class StoreService implements IStoreService {
  constructor(private store: Store<IAppState>) {}

  setOrigin = (payload: LatLng) => {
    this.store.dispatch({
      type: SET_ORIGIN,
      payload
    });
  };

  setParks = (payload: IPark[]) => {
    this.store.dispatch({
      type: SET_PARKS,
      payload
    });
  };

  onParksUpdate = (cb: (parks: IPark[]) => void) => {
    this.store.select<IPark[]>(state => state.parks).subscribe(cb);
  };

  onOriginUpdate = (cb: (latLng: LatLng) => void) => {
    this.store.select<LatLng>(state => state.origin).subscribe(cb);
  };
}
