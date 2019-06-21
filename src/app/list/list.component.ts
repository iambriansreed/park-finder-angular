import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../store.service';
import { PlaceResult, LatLng, IPark, IAppState } from '../models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  parks: IPark[] = [];
  origin: LatLng;
  storeService: StoreService;

  constructor(private store: Store<IAppState>) {
    // Todo: make this require an IStoreService
    this.storeService = new StoreService(this.store);

    this.storeService.onParksUpdate(parks => {
      this.parks = parks;
    });
    this.storeService.onOriginUpdate(origin => {
      this.origin = origin;
    });
  }

  directionsUrl(place: PlaceResult) {
    return `https://www.google.com/maps/dir/${this.origin.toUrlValue()}/${place.geometry.location.toUrlValue()}`;
  }

  onClickPark(park: IPark) {
    // tslint:disable-next-line: no-unused-expression
    new google.maps.event.trigger(park.marker, 'click');
  }
  ngOnInit() {}
}
