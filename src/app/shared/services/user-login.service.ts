import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoUtil } from '../helpers/crypto.helper';
import { BaseService } from './base.service';
import { AuthenticationModel } from '../models/auth/authentication.model';
import { Area } from '../models/master-data/area.model'
import { map } from 'rxjs/operators';
import { PagePagination } from '../models/master-data/page-pagination.model';


@Injectable({
  providedIn: 'root'
})
export class UserLoginService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  loginConnectApi(email: string, password: string): Observable<AuthenticationModel>{
    const url = 'login';
    const requesModel = {
      userName: email,
      password: CryptoUtil.hashMessage(password) ,
      "deviceType": "string",
      "token": "string"
    }
    return this.post<any>(url, requesModel);
  }

  changePassword(accountId: string, oldPassword: string, newPassword: string): Observable<any>{
    const data = {
      accountId,
      oldPassword: CryptoUtil.hashMessage(oldPassword),
      newPassword: CryptoUtil.hashMessage(newPassword)
    };
    return this.post(`account/change-password`, data);
  }

}
