import { Place } from '../places/place/place.model';
import { Component, OnInit } from '@angular/core';
import { PlacesService} from '../places/places.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'mt-place-detail',
  templateUrl: './place-detail.component.html'
})

export class PlaceDetailComponent implements OnInit {

  place: Place

  constructor(private placesService: PlacesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.placesService.placeById(this.route.snapshot.params['id'])
    .subscribe(place => this.place = place);
  }

}
