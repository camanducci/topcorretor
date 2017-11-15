import { Http } from '@angular/http';

import {Injectable} from '@angular/core';

import {Place} from './place/place.model';
import {MenuItem} from '../place-detail/menu-item/menu-item.model'

import {MEAT_API} from '../app.api';

import {Observable} from 'rxjs/Observable';

import {ErrorHandler} from '../app.error-handler';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class PlacesService {

    constructor(private http: Http){}
    
    places(): Observable<Place[]> {
        return this.http.get(`${MEAT_API}/places`)
        .map(Response => Response.json())
        .catch(ErrorHandler.handleError);
    }

    placeById(id: string): Observable<Place>{
        return this.http.get(`${MEAT_API}/places/${id}`)
        .map(Response => Response.json())
        .catch(ErrorHandler.handleError);
    }
    
    reviewsOfPlace(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/places/${id}/reviews`)
        .map(Response => Response.json())
        .catch(ErrorHandler.handleError);
    }

    menuOfPlace(id: string): Observable<MenuItem[]>{
        return this.http.get(`${MEAT_API}/places/${id}/menu`)
        .map(Response => Response.json())
        .catch(ErrorHandler.handleError);
    }

}