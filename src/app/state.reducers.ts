import { Action } from '@ngrx/store';
import { IPark, IStateAction, LatLng } from './models';

export const SET_PARKS = 'SET_PARKS';
export const SET_ORIGIN = 'SET_ORIGIN';

export const ParksReducerMap = (state: IPark[] = [], action: IStateAction) => {
  return SET_PARKS === action.type ? action.payload : state;
};

export const OriginReducerMap = (
  state: LatLng = null,
  action: IStateAction
) => {
  return SET_ORIGIN === action.type ? action.payload : state;
};

export const actionReducerMap = {
  parks: (state: IPark[] = [], action: IStateAction) => {
    return SET_PARKS === action.type ? action.payload : state;
  },
  origin: (state: LatLng = null, action: IStateAction) => {
    return SET_ORIGIN === action.type ? action.payload : state;
  }
};
