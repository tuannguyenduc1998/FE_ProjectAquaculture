import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { PagePagination } from '../models/master-data/page-pagination.model';
import { ShrimpCropData } from '../models/record-active/shrimp-crop-data.model';
import { ShrimpCropFilter } from '../models/shrimp-crop/shrimp-crop-filter.model';
import { Factor, ShrimpCrop } from '../models/shrimp-crop/shrimp-crop.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ShrimpCropService extends BaseService {

  constructor(private httpClient: HttpClient) { 
    super(httpClient);
  }
  
  getFilterShrimpCrop(pageIndex: number, pageSize: number, params: ShrimpCropFilter): Observable<PagePagination<ShrimpCrop>> {
    if (!params.farmingLocationId) {
      delete params.farmingLocationId;
    }
    if (!params.shrimpBreedId) {
      delete params.shrimpBreedId;
    }
    const url=`shrimp-crop/filter/${pageIndex - 1}/${pageSize}`
    return this.get(url, Utils.createFilterParam(params)).pipe(
      map((result: any) => {
        return result;
      })
    )
  }
  
  create(data: any): Observable<any> {
    const url = "shrimp-crop/create";
    return this.post(url, data)
  }

  detail(id: string): Observable<ShrimpCrop> {
    const url = `shrimp-crop/${id}`;
    return this.get(url);
  }

  update(data): Observable<ShrimpCrop> {
    const url = "shrimp-crop/update";
    return this.put(url, data)
  }

  getShrimpCropByID(id: string): Observable<ShrimpCropData> {
    return this.get(`shrimp-crop/${id}`);
  }

  createOrUpdateFactor(factor: Factor): Observable<any> {
    return this.post('shrimp-crop/management-factor/create-or-update', factor);
  }

  cancelManagementFactor(param): Observable<any> {
    return this.post('shrimp-crop/management-factor/cancel', param);
  }

  createWork(param): Observable<any> {
    return this.post('shrimp-crop/create-work', param);
  }

  stopWork(shrimCropManagementFactorId): Observable<any> {
    return this.delete(`work/${shrimCropManagementFactorId}/stop`, shrimCropManagementFactorId);
  }
}
