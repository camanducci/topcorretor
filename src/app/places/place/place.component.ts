
import { Component, OnInit, Input } from '@angular/core';
import { Place } from './place.model';

@Component({
  selector: 'mt-place',
  templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit {

  @Input() place: Place;

  constructor() { }

  ngOnInit() {
  }

}
