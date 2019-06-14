import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';
import { StoreModule } from '@ngrx/store';
import { actionReducerMap } from './state.reducers';

@NgModule({
  declarations: [AppComponent, MapComponent, ListComponent],
  imports: [BrowserModule, StoreModule.forRoot({ ...actionReducerMap })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
