import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { PagePagination } from '../models/master-data/page-pagination.model';
import { WorkDataFilter } from '../models/record-active/note-book/work-data-filter.model';
import { WorkData } from '../models/record-active/note-book/work-data.model';
import { WorkHistoryData } from '../models/record-active/note-book/work-history-data.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RecordActiveService extends BaseService {

  constructor(
    private httpClient: HttpClient
  ) {
    super(httpClient);
  }

  getWorkStatus(): Observable<any> {
    return this.get(`data/masterdata?groupsName=WorkStatus,FactorGroup`).pipe(map((result: any) => {
      return result;
    })
  );
  }

  getListWorks(
    pageNumber: number,
    pageSize: number,
    params: WorkDataFilter
  ): Observable<PagePagination<WorkData>> {
    const paramsFilter: WorkDataFilter = { ...params };
    if (!paramsFilter.farmingLocationId) {
      delete paramsFilter.farmingLocationId;
    }
    if (!paramsFilter.shrimpCropId) {
      delete paramsFilter.shrimpCropId;
    }
    if (!paramsFilter.status) {
      delete paramsFilter.status;
    }
    if (!paramsFilter.factorGroup) {
      delete paramsFilter.factorGroup;
    }
    if (!paramsFilter.curator) {
      delete paramsFilter.curator;
    }
    return this.get(
      `work/filter/${pageNumber - 1}/${pageSize}`,
      Utils.createFilterParam({ ...paramsFilter })
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  getWorkHistory(id: string): Observable<WorkHistoryData[]>{
    return this.get(`work/${id}/histories`);
  }

  deleteWork(id: string): Observable<any>{
    return this.delete(`work/${id}/delete`, null);
  }

  createOrUpdateWork(data): Observable<any>{
    return this.put(`work/record`, data).pipe(map((res) => {
      return res;
    }));
  }

  uploadImage(file: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.post(`file`, formData);
  }

  updateImage(value): Observable<any>{
    return this.put(`work/update-picture`, value);
  }

  deleteImage(value): Observable<any>{
    return this.delete(`work/remove-picture`, value);
  }
}
