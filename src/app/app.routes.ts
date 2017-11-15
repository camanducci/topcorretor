import { ReviewsComponent } from './place-detail/reviews/reviews.component';
import { MenuComponent } from './place-detail/menu/menu.component';


import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PlacesComponent } from './places/places.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';



export const ROUTES: Routes = [
    {path:'',component: HomeComponent},
    {path:'about',component: AboutComponent},
    {path:'places',component: PlacesComponent},
    {path:'places/:id', component: PlaceDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]}
];