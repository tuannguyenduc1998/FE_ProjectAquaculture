import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AddressMasterData } from '../models/master-data/address-master-data.model';
import { FarmingObject } from '../models/master-data/farming-object.model';
import { BaseService } from './base.service';
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root',
})
export class MasterDataService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  private addressmasterdata$: Observable<AddressMasterData[]>;

  getMasterData(groupName: string): Observable<any> {
    return this.get(`data/masterdata?groupsName=${groupName}`);
  }

  getAddressMasterData(): Observable<any> {
    return this.get(`data/addressmasterdata`).pipe(
      map((data) =>
        data.map((item) => {
          return this.mappingAddressMasterData(item);
        })
      )
    );
  }

  get addressMaster(): Observable<any> {
    if (!this.addressmasterdata$) {
      this.addressmasterdata$ = this.getAddressMasterData().pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.addressmasterdata$;
  }

  mappingAddressMasterData(result): AddressMasterData {
    return {
      key: result.id,
      code: result.code,
      value: result.name,
      parentId: result.parentId,
      type: result.type,
      childs:
        result.childs && (result.childs || []).length
          ? result.childs.map((item) => {
              return this.mappingAddressMasterData(item);
            })
          : null,
    };
  }

  getProvince(
    countryId: number,
    dataAddressMasterData: AddressMasterData[]
  ): AddressMasterData[] {
    const data = (dataAddressMasterData || []).find(
      (item) => +item.key === countryId
    );
    return data ? data.childs : null;
  }

  getDistrict(
    provinceId: number,
    dataCountry: AddressMasterData[]
  ): AddressMasterData[] {
    const data = (dataCountry || []).find((item) => +item.key === provinceId);
    return data ? data.childs : null;
  }

  getWard(
    districtId: number,
    dataDistrict: AddressMasterData[]
  ): AddressMasterData[] {
    const data = (dataDistrict || []).find((item) => +item.key === districtId);
    return data ? data.childs : null;
  }

  getFarmingObjectAll(): Observable<FarmingObject[]> {
    const url = `data/shrimp-breed/get-all`;
    return this.get(url);
  }
}
