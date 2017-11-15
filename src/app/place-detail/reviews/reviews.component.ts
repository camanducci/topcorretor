import { Component, OnInit } from '@angular/core';
import { PlacesService} from '../../places/places.service'
import { Observable} from 'rxjs/Observable'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private placesService: PlacesService, 
        private route: ActivatedRoute) { }

  ngOnInit() {
      this.reviews = this.placesService
      .reviewsOfPlace(this.route.parent.snapshot.params['id'])
  }

}
