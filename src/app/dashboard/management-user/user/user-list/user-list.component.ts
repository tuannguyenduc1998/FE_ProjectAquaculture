import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { utils } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ChangeUserGroupPopupComponent } from 'src/app/shared/component/popups/change-user-group-popup/change-user-group-popup.component';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { CreatePasswordPopupComponent } from 'src/app/shared/component/popups/create-password-popup/create-password-popup.component';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { CryptoUtil } from 'src/app/shared/helpers/crypto.helper';
import Utils from 'src/app/shared/helpers/utils.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { UserData } from 'src/app/shared/models/user/user-data.model';
import { User } from 'src/app/shared/models/user/user.model';
import { UserDataFilter } from 'src/app/shared/models/user/userDataFilter.model';
import { UserGroup } from 'src/app/shared/models/user/userGroups.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userGroups: UserGroup[];
  checkSelectAll: boolean;
  userList: UserData[] = [];
  userLogin: AuthenticationModel;
  filterModel: UserDataFilter = new UserDataFilter();
  searchTerm$ = new BehaviorSubject('');
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    this.userService.getGroupUsers().subscribe((res) => {
      this.userGroups = res;
    });
    this.searchTerm$.pipe(debounceTime(200)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filterUserList();
    });
  }

  filterUserList(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.userService
      .getListUsers(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((result) => {
        this.userList = result.items;
        this.total = result.totalCount;
        this.pageIndex = result.pageIndex + 1;
      });
  }

  changPageSize(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filterUserList();
  }

  changePageIndex(event: number): void {
    this.filterUserList(event);
  }

  changeStatusActive(data: any): void {
    const requestModel = {
      id: data.id,
      isActive: !data.isActive,
      modifiedAt: data.modifiedAt,
    };
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Xác nhận',
        content: data.isActive
          ? `Bạn có chắc muốn ngưng hoạt động người dùng ${
              data && data.userName
            } này?`
          : `Bạn có chắc muốn kích hoạt hoạt động người dùng  ${
              data && data.userName
            } này? `,
      },
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        this.userService.changeStatusUser(requestModel).subscribe((res) => {
          this.notification.success(
            'Thông báo',
            'Cập nhật trạng thái người dùng thành công'
          );
          this.filterUserList();
        });
      }
    });
  }

  onSelectAll(value: boolean): void {
    (this.userList || [])
      .filter((item) => item.id !== this.userLogin.userId)
      .forEach((x) => (x.checkSelected = value));
  }

  changeCheckAll(): void {
    this.checkSelectAll = (this.userList || [])
      .filter((item) => item.id !== this.userLogin.userId)
      .every((item) => item.checkSelected);
  }

  changeUserGroup(data: any): void {
    const modal = this.modalService.create({
      nzContent: ChangeUserGroupPopupComponent,
      nzComponentParams: {
        userId: data.id,
        groupId: data.group,
      },
    });
    modal.afterClose.subscribe((result) => {
      if (result) {
        this.filterUserList();
      }
    });
  }

  deleteUser(data: any): void {
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        content: 'Bạn có chắc muốn xóa dữ liệu này không?',
      },
    });
    modal.afterClose.subscribe((res) => {
      if (res && res.data) {
        const model = {
          ids: data ? [data.id] : null
        };
        this.userService.deleteUser(model).subscribe((result) => {
          if (result) {
            this.notification.success(
              'Thông báo',
              'Xóa người dùng thành công!'
            );
            this.filterUserList();
          }
        });
      }
    });
  }

  createPassword(data: any): void {
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Xác nhận',
        content: 'Bạn có chắc muốn đặt lại mật khẩu không?',
      },
    });
    modal.afterClose.subscribe((res) => {
      if (res && res.data) {
        const password = Utils.regenerativePassword();
        const model = {
          userId : data.id,
          password: CryptoUtil.hashMessage(password)
        };
        this.userService.resetPassword(model).subscribe((result) => {
          if (result) {
            data.modifiedAt = result.data.modifiedAt;
            const modalCreatePw = this.modalService.create({
              nzContent: CreatePasswordPopupComponent,
              nzComponentParams: {
                title: 'Thông báo',
                newPassword: password,
                userName: data.userName
              },
            });
            this.notification.success(
              'Thông báo',
              'Đặt lại mật khẩu người dùng thành công!'
            );
            modalCreatePw.afterClose.subscribe((result1) => {
              if (result1 && result1.data){
                this.notification.success(
                  'Thông báo',
                  'Sao chép mật khẩu người dùng thành công!'
                );
              }
            });
          }
        });
      }
    });
  }
}
