import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserLoginService } from 'src/app/shared/services/user-login.service';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss'],
})
export class ChangePasswordPopupComponent implements OnInit {
  user: AuthenticationModel;
  formChangePassword: FormGroup;
  isSubmit: boolean;
  formErrors = {
    password: '',
    newPassword: '',
    confirmPassword: '',
    mustMatch: '',
  };
  invalidMessages: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserLoginService,
    private authenticationService: AuthenticationService,
    private notificationService: NzNotificationService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getAuthenticationModel();
    this.createForm();
    this.formChangePassword.valueChanges.subscribe((_) => {
      if (this.isSubmit) {
        this.validateForm();
      }
    });
  }

  createForm(): void {
    this.formChangePassword = this.formBuilder.group(
      {
        password: [null, [CustomValidator.required]],
        newPassword: [null, [CustomValidator.required]],
        confirmPassword: [null, [CustomValidator.required]],
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }
    );
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.formChangePassword,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.validateForm()) {
      this.userService.changePassword(
        this.user.id,
        this.formChangePassword.get('password').value,
        this.formChangePassword.get('newPassword').value
      ).subscribe((res) => {
        if (res){
          this.notificationService.success('Thông báo', 'Thay đổi mật khẩu thành công!');
          this.closePopup();
        }
      });
    }
  }

  closePopup(): void{
    this.modal.destroy({});
  }
}
