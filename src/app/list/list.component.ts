import { Component, OnInit } from '@angular/core';
import { PlaceResult, LatLng } from '../google-places.service';
import { Store } from '@ngrx/store';
import { AppState, SET_ORIGIN, Park } from '../state.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  parks: Park[] = [];
  origin: LatLng;
  constructor(private store: Store<AppState>) {
    this.store
      .select<Park[]>(state => state.parks)
      .subscribe(parks => {
        this.parks = parks;
      });
    this.store
      .select<LatLng>(state => state.origin)
      .subscribe(origin => {
        this.origin = origin;
      });
  }
  directionsUrl(place: PlaceResult) {
    return `https://www.google.com/maps/dir/${this.origin.toUrlValue()}/${place.geometry.location.toUrlValue()}`;
  }

  onClickPark(park: Park) {
    new google.maps.event.trigger(park.marker, 'click');
  }
  ngOnInit() {}
}
