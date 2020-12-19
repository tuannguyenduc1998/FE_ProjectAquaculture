import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { ETypeForm } from 'src/app/shared/enum/type-form';
import { CryptoUtil } from 'src/app/shared/helpers/crypto.helper';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import Utils from 'src/app/shared/helpers/utils.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { GenerateItemType } from 'src/app/shared/models/generate-masterdata/generate-itemtype.model';
import { AddressMasterData } from 'src/app/shared/models/master-data/address-master-data.model';
import { UserData } from 'src/app/shared/models/user/user-data.model';
import { User } from 'src/app/shared/models/user/user.model';
import { UserGroup } from 'src/app/shared/models/user/userGroups.model';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() id: string;
  @Input() typeForm: string;
  etypeForm = ETypeForm;
  userForm: FormGroup;
  userGroups: UserGroup[];
  userModel: UserData = new UserData();
  masterDataAddressWard: AddressMasterData[];
  masterDataAddressDistrict: AddressMasterData[];
  masterDataAddressProvince: AddressMasterData[];
  masterDataCountry: AddressMasterData[];
  isSubmit: boolean;
  invalidMessages: string[];
  formErrors = {
    userName: '',
    passWord: '',
    fullName: '',
    email: '',
    cellPhone: '',
    address: '',
    confirmPassword: '',
    mustMatch: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private masterDataService: MasterDataService,
    private userService: UserService,
    private router: Router,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      forkJoin([
        this.userService.getGroupUsers(),
        this.masterDataService.addressMaster,
        this.userService.getUserById(this.id),
      ]).subscribe(([res1, res2, res3]) => {
        this.userGroups = res1;
        this.masterDataCountry = res2;
        this.masterDataAddressProvince = this.masterDataService.getProvince(
          1,
          res2
        );
        this.userModel = res3;
        if (this.userModel.province) {
          this.masterDataAddressDistrict = this.masterDataService.getDistrict(
            +this.userModel.province.key,
            this.masterDataAddressProvince
          );
          this.masterDataAddressWard = this.masterDataService.getWard(
            +this.userModel.district.key,
            this.masterDataAddressDistrict
          );
        }
        this.createForm();
        this.userForm.valueChanges.subscribe((_) => {
          if (this.isSubmit) {
            this.validateForm();
          }
        });
      });
    }
    if (!this.id) {
      forkJoin([
        this.userService.getGroupUsers(),
        this.masterDataService.addressMaster,
      ]).subscribe(([res1, res2]) => {
        this.userGroups = res1;
        this.masterDataCountry = res2;
        this.masterDataAddressProvince = this.masterDataService.getProvince(
          1,
          res2
        );
        this.createForm();
        this.userForm.valueChanges.subscribe((_) => {
          if (this.isSubmit) {
            this.validateForm();
          }
        });
      });
    }
  }

  createForm(): void {
    this.userForm = this.formBuilder.group(
      {
        userName: [this.userModel.userName, CustomValidator.required],
        passWord: [
          this.userModel.password,
          this.typeForm === this.etypeForm.create
            ? CustomValidator.required
            : null,
        ],
        confirmPassword: [
          this.userModel.password,
          this.typeForm === this.etypeForm.create
            ? CustomValidator.required
            : null,
        ],
        userGroup: [this.userModel.group],
        fullName: [this.userModel.fullName, CustomValidator.required],
        email: [
          this.userModel.email,
          [CustomValidator.required, CustomValidator.email],
        ],
        cellPhone: [this.userModel.phone],
        province: [this.userModel.province],
        district: [this.userModel.district],
        ward: [this.userModel.commune],
        address: [this.userModel.address],
        isActive: [this.id ? this.userModel.isActive : true],
      },
      {
        validator: MustMatch('passWord', 'confirmPassword'),
      }
    );
  }

  validateForm(): boolean {
    if (this.typeForm === this.etypeForm.edit) {
      delete this.formErrors.confirmPassword;
      delete this.formErrors.passWord;
      delete this.formErrors.mustMatch;
    }
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.userForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  changeProvince(event): void {
    this.userForm.get('district').patchValue(null);
    this.userForm.get('ward').patchValue(null);
    this.masterDataAddressWard = null;
    if (!event) {
      this.masterDataAddressDistrict = null;
      return;
    }
    this.masterDataAddressDistrict = this.masterDataService.getDistrict(
      event ? event.key : null,
      this.masterDataAddressProvince
    );
  }

  changeDistrict(event): void {
    this.userForm.get('ward').patchValue(null);
    if (!event) {
      this.masterDataAddressWard = null;
      return;
    }
    this.masterDataAddressWard = this.masterDataService.getWard(
      event ? event.key : null,
      this.masterDataAddressDistrict
    );
  }

  get address(): string {
    if (!this.userForm) {
      return '';
    }
    const formValue = this.userForm.getRawValue();
    return Utils.address([
      formValue.address,
      formValue.ward && formValue.ward.value,
      formValue.district && formValue.district.value,
      formValue.province && formValue.province.value,
    ]);
  }

  mappingModel(formValue): any {
    return {
      id: this.id,
      userName: formValue.userName,
      password: this.id ? null : CryptoUtil.hashMessage(formValue.passWord),
      group: formValue.userGroup && {
        id: formValue.userGroup.id,
        name: formValue.userGroup.name,
        groupCode: null,
        description: formValue.userGroup.description,
      },
      isActive: formValue.isActive,
      fullName: formValue.fullName,
      email: formValue.email,
      phone: formValue.cellPhone,
      province: formValue.province && this.mappingAdsress(formValue.province),
      district: formValue.district && this.mappingAdsress(formValue.district),
      commune: formValue.ward && this.mappingAdsress(formValue.ward),
      address: formValue.address,
      modifiedAt: this.userModel && this.userModel.modifiedAt,
    };
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.validateForm()) {
      this.userService
        .createOrUpdateUser(this.mappingModel(this.userForm.value))
        .subscribe((res) => {
          if (res) {
            this.router.navigate(['/dashboard/management-user/user/']);
          }
        });
    }
  }

  compareData(o1, o2): boolean {
    return o1 && o2 ? +o1.code === +o2.code : o1 === o2;
  }

  compareDataUserGroup(o1, o2): boolean {
    return o1 && o2 ? o1.id.toString() === o2.id.toString() : o1 === o2;
  }

  mappingAdsress(formData): GenerateItemType {
    return {
      key: formData && formData.key.toString(),
      value: formData && formData.value,
      displayText: formData && formData.value,
      code: formData && formData.code,
      typeGroup: formData && formData.type
    };
  }
}
