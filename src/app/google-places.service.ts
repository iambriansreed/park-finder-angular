import { Injectable } from '@angular/core';
import { Observable, bindCallback } from 'rxjs';

export type PlaceResult = google.maps.places.PlaceResult;
export type PlacesServiceStatus = google.maps.places.PlacesServiceStatus;
export type PlaceSearchPagination = google.maps.places.PlaceSearchPagination;
export type Map = google.maps.Map;
export type Marker = google.maps.Marker;
export type LatLng = google.maps.LatLng;

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  map: google.maps.Map;

  setMap = (map: google.maps.Map) => {
    this.map = map;
    return this;
  };

  getParks = (): Observable<
    [PlaceResult[], PlacesServiceStatus, PlaceSearchPagination]
  > => {
    return bindCallback(this.nearbySearch)();
  };

  private nearbySearch = (
    callback: (
      results: PlaceResult[],
      status: PlacesServiceStatus,
      pagination: PlaceSearchPagination
    ) => void
  ) => {
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      type: 'park',
      location: this.map.getCenter(),
      radius: 1500,
      bounds: this.map.getBounds(),
      fields: ['name', 'geometry']
    };
    service.nearbySearch(request, callback);
  };
}
