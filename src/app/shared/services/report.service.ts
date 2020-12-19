import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FarmingLocation } from '../models/report/farming-location.model';
import { ShrimpCrop } from '../models/report/shrimp-crop.model';
import { Work, WorkParam } from '../models/report/work.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getAllFarmingLocation(): Observable<FarmingLocation[]> {
    return this.get('farming-location/get-all');
  }

  getAllShrimpCrop(): Observable<ShrimpCrop[]> {
    return this.get('shrimp-crop/get-all');
  }

  getWorkFilter(workParam: WorkParam): Observable<Work[]> {
    return this.get('work/get-all', workParam);
  }
}
