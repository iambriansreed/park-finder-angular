import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject
} from '@angular/core';
import { getCoords } from '../utils';
import { IMapService } from '../models';
import { GoogleMapService } from '../google-map.service';

@Component({
  selector: 'app-map',
  template: '<div #mapContainer></div>',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: 'IMapService', useClass: GoogleMapService }]
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapElement: any;
  constructor(@Inject('IMapService') private mapService: IMapService) {}
  ngOnInit(): void {
    getCoords().then(coords => {
      this.mapService.initMap(
        this.mapElement.nativeElement,
        coords.latitude,
        coords.longitude
      );
    });
  }
}
