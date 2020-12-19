import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { UserDataFilter } from '../models/user/userDataFilter.model';
import { PagePagination } from '../models/master-data/page-pagination.model';
import { Feature } from '../models/user/feature.model';
import { GroupUser } from '../models/user/group-user.model';
import { BaseService } from './base.service';
import { UserData } from '../models/user/user-data.model';
import { UserInfo } from '../models/user/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getGroupUsers(): Observable<any> {
    return this.get(`group/get-all`).pipe(map((result: any) => {
      return result;
    })
    );
  }

  getListUsers(
    pageNumber: number,
    pageSize: number,
    params: UserDataFilter
  ): Observable<PagePagination<UserData>> {
    const paramsFilter: UserDataFilter = { ...params };
    if (!paramsFilter.groupId) {
      delete paramsFilter.groupId;
    }
    return this.get(
      `user/filter/${pageNumber - 1}/${pageSize}`,
      Utils.createFilterParam({ ...paramsFilter })
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  changeStatusUser(value): Observable<any> {
    return this.patch(`user/change-status`, value);
  }

  changeUserGroup(value): Observable<any> {
    return this.patch(`user/change-group`, value);
  }

  deleteUser(value): Observable<any> {
    return this.delete(`user/delete`, value);
  }

  getUserById(id: string): Observable<any> {
    return this.get(`user/get?userId=${id}`);
  }

  createOrUpdateUser(data: any): Observable<any> {
    if (data.id) {
      return this.put(`user/update`, data);
    }
    return this.post(`user/create`, data);
  }

  resetPassword(value): Observable<any> {
    return this.patch(`account/reset-password`, value);
  }
  getGroupUserList(
    page: number,
    pageSize: number,
    keySearch
  ): Observable<PagePagination<GroupUser>> {
    return this.get(`group/filter/${page - 1}/${pageSize}`, keySearch);
  }

  getAllFeature(): Observable<Feature[]> {
    return this.get('data/feature');
  }

  getUserGroupById(id: string): Observable<GroupUser> {
    return this.get(`group/${id}`);
  }

  createOrUpdateUserGroup(groupUser: GroupUser): Observable<any> {
    if (groupUser.id) {
      return this.put('group/update', groupUser);
    }

    return this.post('group/create', groupUser);
  }

  deleteUserGroup(groups): Observable<any> {
    return this.delete('group/delete', groups);
  }

  getAllUser(): Observable<any>{
    return this.get(`user/get-all`);
  }
}
