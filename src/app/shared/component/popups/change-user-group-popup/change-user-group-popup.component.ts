import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { UserGroup } from 'src/app/shared/models/user/userGroups.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-change-user-group-popup',
  templateUrl: './change-user-group-popup.component.html',
  styleUrls: ['./change-user-group-popup.component.scss'],
})
export class ChangeUserGroupPopupComponent implements OnInit {
  @Input() userId: string;
  @Input() groupId: string;
  userGroupForm: FormGroup;
  userGroups: UserGroup[];
  isSubmit: boolean;
  invalidMessages: string[];
  formErrors = {
    group: ''
  };
  constructor(
    private modal: NzModalRef,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.userService.getGroupUsers().subscribe((res) => {
      this.userGroups = res;
      this.createForm();
    });
  }

  createForm(): void {
    this.userGroupForm = this.formBuilder.group({
      group: [this.groupId, CustomValidator.required],
    });
    this.userGroupForm.valueChanges.subscribe((_) => {
      if (this.isSubmit) {
        this.validateForm();
      }
    });
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.userGroupForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  closePopup(): void {
    this.modal.destroy({});
  }

  compareData(o1, o2): boolean {
    return o1 && o2 ? o1.id.toString() === o2.id.toString() : o1 === o2;
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.validateForm()) {
      const userGroupModel = {
        userId: this.userId,
        groupId: this.userGroupForm.get('group').value.id
      };
      this.userService.changeUserGroup(userGroupModel).subscribe((res) => {
        if (res) {
          this.notificationService.success(
            'Thông báo',
            'Thay đổi nhóm thành công!'
          );
          this.closePopup();
        }
      });
    }
  }
}
