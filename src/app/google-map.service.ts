import { Injectable } from '@angular/core';
import { Observable, bindCallback } from 'rxjs';
import {
  PlaceResult,
  PlacesServiceStatus,
  IMapService,
  LatLng,
  IPark,
  Marker,
  Map,
  IAppState
} from './models';
import { StoreService } from './store.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService implements IMapService {
  static defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  infowindow: google.maps.InfoWindow;
  map: Map;
  parks: IPark[] = [];
  updateParksTimeout = setTimeout(() => {}, 0);
  storeService: StoreService;
  constructor(private store: Store<IAppState>) {
    // Todo: make this require an IStoreService
    this.storeService = new StoreService(this.store);
  }

  initMap = (mapElement: HTMLElement, latitude: number, longitude: number) => {
    const center = new google.maps.LatLng(latitude, longitude);

    this.map = new google.maps.Map(mapElement, {
      center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.storeService.setOrigin(center);
    this.infowindow = new google.maps.InfoWindow();
    this.map.addListener('center_changed', this.updateParks);
    this.map.addListener('bounds_changed', this.updateParks);
  };

  setCenter = (latLng: LatLng) => {
    this.map.setCenter(latLng);
  };

  getParks = (): Observable<[PlaceResult[], PlacesServiceStatus]> => {
    return bindCallback(
      (
        callback: (results: PlaceResult[], status: PlacesServiceStatus) => void
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
      }
    )();
  };

  updateParks = () => {
    clearTimeout(this.updateParksTimeout);
    this.updateParksTimeout = setTimeout(() => {
      const oldMarkers = [...this.parks.map(park => park.marker)];
      this.getParks().subscribe(([results, status]) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        this.parks = results.map(result => ({
          place: result,
          marker: this.createMarker(result.name, result.geometry.location)
        }));
        oldMarkers.forEach(marker => marker.setMap(null));
        this.storeService.setParks(this.parks);
      });
    }, 250);
  };

  private createMarker = (
    name: string,
    position: LatLng,
    icon = GoogleMapService.defaultIcon
  ): Marker => {
    const marker = new google.maps.Marker({
      map: this.map,
      position,
      icon
    });

    google.maps.event.addListener(marker, 'click', function() {
      this.infowindow.setContent(name);
      this.infowindow.open(this.map, this);
    });
    return marker;
  };
}
