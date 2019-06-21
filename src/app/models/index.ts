import { Store, Action } from '@ngrx/store';

// Todo: remove all trace of goggle map services except in the single service file.
// Iterface all the things!
export type PlaceResult = google.maps.places.PlaceResult;
export type PlacesServiceStatus = google.maps.places.PlacesServiceStatus;
export type Map = google.maps.Map;
export type Marker = google.maps.Marker;
export type LatLng = google.maps.LatLng;

export type Noop = () => void;

export interface IPark {
  place: PlaceResult;
  marker: Marker;
}

export interface IMapService {
  initMap: (
    mapElement: HTMLElement,
    latitude: number,
    longitude: number
  ) => void;
  setCenter: (latLng: LatLng) => void;
}

export interface IStoreService {
  setOrigin: (latLng: LatLng) => void;
  setParks: (parks: IPark[]) => void;
  onOriginUpdate: (noop: (latLng: LatLng) => void) => void;
  onParksUpdate: (noop: (parks: IPark[]) => void) => void;
}
export type IStoreServiceCall = 'SET_PARKS' | 'SET_ORIGIN';

export interface IStateAction extends Action {
  payload: any;
}

export interface IAppState {
  parks: IPark[];
  origin: LatLng;
}
