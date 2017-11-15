
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PlacesComponent } from './places/places.component';
import { PlaceComponent } from './places/place/place.component';
import { PlacesService } from './places/places.service';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { MenuComponent } from './place-detail/menu/menu.component';
import { ShoppingCartComponent } from './place-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './place-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './place-detail/reviews/reviews.component';
import { ShoppingCartService } from './place-detail/shopping-cart/shopping-cart.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    PlacesComponent,
    PlaceComponent,
    PlaceDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PlacesService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
