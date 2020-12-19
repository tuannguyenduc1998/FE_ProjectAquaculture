import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { AuthenticationModel } from '../../models/auth/authentication.model';
import { AuthenticationService } from '../../services/authentication.service';
import { ChangePasswordPopupComponent } from '../popups/change-password-popup/change-password-popup.component';
import { ConfirmPopupComponent } from '../popups/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.scss']
})
export class HearderComponent implements OnInit {
  user: AuthenticationModel;
  constructor(private modalService: NzModalService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getAuthenticationModel();
  }

  changePassword(): void {
    const modal = this.modalService.create({
      nzContent: ChangePasswordPopupComponent,
    });
  }

  logOut(): void{
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        content: 'Bạn có chắc chắn muốn đăng xuất không?'
      }
    });
    modal.afterClose.subscribe((res) => {
      if (res && res.data){
        this.authenticationService.logOut();
      }
    });
  }
}
