import { PlaceResult, Marker, LatLng } from './google-places.service';
import { Action } from '@ngrx/store';

export type Park = { place: PlaceResult; marker: Marker };

export interface AppState {
  parks: Park[];
  origin: LatLng;
}

export const SET_PARKS = 'SET_PARKS';
export const SET_ORIGIN = 'SET_ORIGIN';

interface StateAction extends Action {
  payload: any;
}

function reducerMap<T>(defaultValue: any, actionType: string) {
  return function(state: T = defaultValue, action: StateAction) {
    return actionType === action.type ? action.payload : state;
  };
}

export const actionReducerMap = {
  parks: reducerMap<Park[]>([], SET_PARKS),
  origin: reducerMap<LatLng>(null, SET_ORIGIN)
};
