import { MenuItem } from '../menu-item/menu-item.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { PlacesService} from '../../places/places.service'
import { Observable} from 'rxjs/Observable'

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private placesService: PlacesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.placesService
    .menuOfPlace(this.route.parent.snapshot.params['id'])
  }

  addMenuItem(item: MenuItem){
    console.log(item)
  }

}
