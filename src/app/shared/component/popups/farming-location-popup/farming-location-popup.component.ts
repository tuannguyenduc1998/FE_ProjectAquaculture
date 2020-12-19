import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { DataArea } from 'src/app/shared/models/data-source/data-area.model';
import { FarmingLocationItem } from 'src/app/shared/models/data-source/farming-location/farming-location-item.model';
import { GenerateItemType } from 'src/app/shared/models/generate-masterdata/generate-itemtype.model';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';

@Component({
  selector: 'app-farming-location-popup',
  templateUrl: './farming-location-popup.component.html',
  styleUrls: ['./farming-location-popup.component.scss'],
})
export class FarmingLocationPopupComponent implements OnInit {
  @Input() dataFarmingLocation: FarmingLocationItem;
  farminglocationTypeData: GenerateItemType[];
  locationForm: FormGroup;
  isSubmit: boolean;
  areaData = new DataArea();
  formErrors = {
    name: '',
    locationType: '',
    area: ''
  };
  invalidMessages: string[] = [];

  constructor(
    private modal: NzModalRef,
    private dataSourceService: DataSourceService,
    private masterDataService: MasterDataService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    forkJoin([this.dataSourceService.getListDataArea(), this.masterDataService.getMasterData('LocationType')]).subscribe(
      ([result1, result2]) => {
        this.areaData = result1;
        this.farminglocationTypeData = result2.find(
          (x) => x.groupName === 'LocationType'
        ).childs;
        this.createForm();
        this.locationForm.valueChanges.subscribe((_) => {
          if (this.isSubmit) {
            this.validateForm();
          }
        });
      }
    );
  }

  compareData(o1, o2): boolean {
    return o1 && o2
      ? o1.code === o2.code
      : o1 === o2;
  }

  compareDataArea(o1, o2): boolean {
    return o1 && o2
      ? o1.id.toString() === o2.id.toString()
      : o1 === o2;
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.locationForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  createForm(): void {
    this.locationForm = this.formBuilder.group({
      id: this.dataFarmingLocation.id,
      code: this.dataFarmingLocation.code,
      name: [this.dataFarmingLocation.name, CustomValidator.required],
      locationType: [this.dataFarmingLocation.type, CustomValidator.required],
      area: [this.dataFarmingLocation.area, CustomValidator.required],
      landArea: this.dataFarmingLocation.landArea,
      description: this.dataFarmingLocation.description,
      attachment: this.dataFarmingLocation.attachment,
      modifiedAt: this.dataFarmingLocation.modifiedAt,
    });
  }

  close(): void {
    this.modal.destroy({});
  }

  onSubmit(): void{
    this.isSubmit = true;
    if (this.validateForm()){
      const locationModel = {
        id: this.locationForm.get('id').value,
        name: this.locationForm.get('name').value,
        locationType: this.locationForm.get('locationType').value,
        area: this.locationForm.get('area').value,
        landArea: +this.locationForm.get('landArea').value,
        description: this.locationForm.get('description').value,
        attachment: this.locationForm.get('attachment').value,
        modifiedAt: this.locationForm.get('modifiedAt').value ? this.locationForm.get('modifiedAt').value : 0,
      };
      this.dataSourceService.createOrUpdate(locationModel).subscribe(res => {
        this.notification.success('Thông báo', this.locationForm.get('id').value ? 'Cập nhật ao nuôi thành công' : 'Tạo mới ao nuôi thành công');
        this.modal.destroy({});
      });
    }
  }
}
