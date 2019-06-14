import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  GooglePlacesService,
  PlaceResult,
  LatLng
} from '../google-places.service';
import { Store } from '@ngrx/store';
import { SET_PARKS, AppState, SET_ORIGIN, Park } from '../state.reducers';

const defaultCoords = {
  latitude: 36.8471508,
  longitude: -76.2953987
};

function getCoords(): Promise<{ latitude: number; longitude: number }> {
  return new Promise(resolve => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        _ => resolve(defaultCoords),
        { timeout: 1000 }
      );
    } else {
      resolve(defaultCoords);
    }
  });
}

@Component({
  selector: 'app-map',
  template: '<div #mapContainer></div>',
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapElement: any;
  map: google.maps.Map;
  parks: Park[];

  constructor(
    private googlePlacesService: GooglePlacesService,
    private store: Store<AppState>
  ) {
    this.googlePlacesService = googlePlacesService;
    this.store = store;
  }

  ngOnInit(): void {
    getCoords().then(coords => {
      this.store.dispatch({
        type: SET_ORIGIN,
        payload: new google.maps.LatLng(coords.latitude, coords.longitude)
      });
      this.setupMap(
        this.mapElement.nativeElement,
        coords.latitude,
        coords.longitude
      );
    });

    this.store
      .select<LatLng>(state => state.origin)
      .subscribe(origin => {
        if (this.map) this.map.setCenter(origin);
      });

    this.store
      .select<Park[]>(state => state.parks)
      .subscribe(parks => {
        this.parks = parks;
      });
  }

  setupMap = (mapElement: Element, latitude: number, longitude: number) => {
    this.map = new google.maps.Map(mapElement, {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    let debounceCenterChanged = setTimeout(() => {}, 0);
    const loadParkMarkersDebounced = () => {
      clearTimeout(debounceCenterChanged);
      debounceCenterChanged = setTimeout(() => {
        this.loadParkMarkers();
      }, 500);
    };

    this.map.addListener('center_changed', loadParkMarkersDebounced);
    this.map.addListener('bounds_changed', loadParkMarkersDebounced);

    this.loadParkMarkers();
  };

  loadParkMarkers = () => {
    let oldMarkers = this.parks.map(park => park.marker);
    const infowindow = new google.maps.InfoWindow();

    this.googlePlacesService
      .setMap(this.map)
      .getParks()
      .subscribe(([results, status, pagination]) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        const parks = results.map(result => ({
          place: result,
          marker: createMarker(this.map, result)
        }));

        pagination.hasNextPage && pagination.nextPage();
        replaceMarkers(oldMarkers, parks.map(park => park.marker));
        this.store.dispatch({ type: SET_PARKS, payload: parks });
      });

    function replaceMarkers(
      markers: google.maps.Marker[],
      newMarkers: google.maps.Marker[]
    ) {
      setTimeout(() => {
        for (const marker of markers) {
          marker.setMap(null);
        }
        markers = [...newMarkers];
      }, 250);
    }

    function createMarker(
      map: google.maps.Map,
      place: PlaceResult
    ): google.maps.Marker {
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });

      return marker;
    }
  };
}
