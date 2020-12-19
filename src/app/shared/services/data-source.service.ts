import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { DataFilter } from '../models/data-source/dataFilter.model';
import { Feature } from '../models/user/feature.model';
import { DataManagementFactor, ManagementFactor } from '../models/data-source/management-factor/management-factor';
import { ManagementFactorFilterParams, ManagementFactorItems } from '../models/data-source/management-factor/management-factor-filter';
import { PagePagination } from '../models/master-data/page-pagination.model';
import { GroupUser } from '../models/user/group-user.model';
import { BaseService } from './base.service';
import { FarmingLocationListData } from '../models/data-source/farming-location/farming-location-listdata.model';
import { FarmingLocationItem } from '../models/data-source/farming-location/farming-location-item.model';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService extends BaseService {

  constructor(
    private httpClient: HttpClient
  ) {
    super(httpClient);
  }

  getManagementFactorList(
    page: number,
    pageSize: number,
    params: ManagementFactorFilterParams
  ): Observable<PagePagination<ManagementFactorItems>> {
    // return this.get(`management-factor/filter/${page}/${pageSize}?searchKey=`, params);
    return this.get(`management-factor/filter/${page - 1}/${pageSize}`, params);
  }

  getFactorGroupFactorDataType(): Observable<any> {
    return this.get('data/masterdata?groupsName=FactorGroup,FactorDataType');
  }

  getMeasureUnit(): Observable<any> {
    return this.get('data/measure-unit');
  }

  getManagementFactor(id: string): Observable<any> {
    return this.get(`management-factor/${id}`);
  }

  createOrUpdateManagementFactor(dataManagementFactor: DataManagementFactor): Observable<any> {
    if (dataManagementFactor.id) {
      return this.put('management-factor/update', dataManagementFactor);
    }

    return this.post('management-factor/create', dataManagementFactor);
  }

  deleteManagementFactor(id: string): Observable<any> {
    return this.delete(`management-factor/${id}/delete`, id);
  }

  getAllShrimpCrop(): Observable<any> {
    return this.get('shrimp-crop/get-all');
  }

  getListFarmingLocation(
    pageNumber: number,
    pageSize: number,
    params: DataFilter
  ): Observable<any> {
    const paramsFilter: DataFilter = { ...params };
    if (!paramsFilter.locationType) {
      delete paramsFilter.locationType;
    }
    return this.get(
      `farming-location/filter/${pageNumber - 1}/${pageSize}`,
      Utils.createFilterParam({ ...paramsFilter })
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  getAllFarmingLocation(): Observable<FarmingLocationItem[]> {
    const url = "farming-location/get-all";
    return this.get(url);
  }



  deleteFarmingLocation(id: string): Observable<any> {
    return this.delete(`farming-location/${id}/delete`, null);
  }

  getListDataArea(): Observable<any> {
    return this.get(`data/area/get-all`);
  }

  createOrUpdate(data: any): Observable<any> {
    if (data.id) {
      return this.put(`farming-location/update`, data);
    }
    return this.post(`farming-location/create`, data);
  }

  getAllManagementFactor(): Observable<ManagementFactor[]> {
    return this.get('management-factor/get-all');
  }
}
