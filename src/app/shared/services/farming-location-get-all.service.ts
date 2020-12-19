import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FarmingLocationItem } from '../models/data-source/farming-location/farming-location-item.model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class FarmingLocationGetAllService extends BaseService  {

  constructor(private httpClient : HttpClient) { 
    super(httpClient)
  }

  getAllFarmingLocation(): Observable<FarmingLocationItem> {
    const url = "farming-location/get-all";
    return this.get(url)
  }

}
