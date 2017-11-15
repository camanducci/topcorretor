import { Component, OnInit } from '@angular/core';

import {Place } from './place/place.model';
import {PlacesService } from './places.service';

@Component({
  selector: 'mt-places',
  templateUrl: './places.component.html'
})
export class PlacesComponent implements OnInit {

  places: Place[]

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesService.places()
    .subscribe(places => this.places = places) //= this.placesService.places()
  }

}
