import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FarmingObject } from '../models/master-data/farming-object.model';
import { PagePagination } from '../models/master-data/page-pagination.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FilterShrimpBreedService  extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
   }

   getFilterShrimpBreedService(pageIndex: number, pageSize: number, searchKey: string):Observable <PagePagination<FarmingObject>> {
    const url = `data/filter-shrimp-breed/${pageIndex}/${pageSize}?searchKey=${searchKey}`
    return this.get(url).pipe(
      map(result => {
        return {
          pageIndex: result.pageIndex,
          pageSize: result.pageSize,
          totalCount: result.totalCount,
          totalPages: result.totalPages,
          items: result.items
        }
      })
    )
   }

}
