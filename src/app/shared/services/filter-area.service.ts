import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Area } from '../models/master-data/area.model';
import { PagePagination } from '../models/master-data/page-pagination.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FilterAreaService extends BaseService {

  constructor(private httpClient: HttpClient) { 
    super(httpClient);
  }

  getFilterArea(pageIndex: number, pageSize: number, searchKey: string): Observable <PagePagination<Area>> {
    const url = `data/filter-area/${pageIndex}/${pageSize}?searchKey=${searchKey}`
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
