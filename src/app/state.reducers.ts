import { PlaceResult, Marker, LatLng } from './google-places.service';
import { Action } from '@ngrx/store';

export interface Park {
  place: PlaceResult;
  marker: Marker;
}

export interface AppState {
  parks: Park[];
  origin: LatLng;
}

export const SET_PARKS = 'SET_PARKS';
export const SET_ORIGIN = 'SET_ORIGIN';

interface StateAction extends Action {
  payload: any;
}

export const ParksReducerMap = (state: Park[] = [], action: StateAction) => {
  return SET_PARKS === action.type ? action.payload : state;
};

export const OriginReducerMap = (state: LatLng = null, action: StateAction) => {
  return SET_ORIGIN === action.type ? action.payload : state;
};

export const actionReducerMap = {
  parks: (state: Park[] = [], action: StateAction) => {
    return SET_PARKS === action.type ? action.payload : state;
  },
  origin: (state: LatLng = null, action: StateAction) => {
    return SET_ORIGIN === action.type ? action.payload : state;
  }
};
