import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { WorkHistoryPopupComponent } from 'src/app/shared/component/popups/work-history-popup/work-history-popup.component';
import { FarmingLocationItem } from 'src/app/shared/models/data-source/farming-location/farming-location-item.model';
import { GenerateItemType } from 'src/app/shared/models/generate-masterdata/generate-itemtype.model';
import { WorkDataFilter } from 'src/app/shared/models/record-active/note-book/work-data-filter.model';
import { WorkData } from 'src/app/shared/models/record-active/note-book/work-data.model';
import { ShrimpCrop } from 'src/app/shared/models/shrimp-crop/shrimp-crop.model';
import { UserData } from 'src/app/shared/models/user/user-data.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { RecordActiveService } from 'src/app/shared/services/record-active.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-note-book-list',
  templateUrl: './note-book-list.component.html',
  styleUrls: ['./note-book-list.component.scss']
})
export class NoteBookListComponent implements OnInit {
  searchTerm$ = new BehaviorSubject('');
  filterModel = new WorkDataFilter();
  workData: WorkData[];
  workDataItem: WorkData = new WorkData();
  farmingLocationData: FarmingLocationItem[];
  userData: UserData[];
  masterDataWorkStatus: GenerateItemType[];
  masterDataFactorGroup: GenerateItemType[];
  shrimpCropData: ShrimpCrop[];
  shrimpCropDataShow: ShrimpCrop[];
  dateNow = new Date();
  isSubmit: boolean;
  isShowImage: boolean;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  constructor(
    private userService: UserService,
    private dataSourceService: DataSourceService,
    private masterDataService: MasterDataService,
    private recordActiveService: RecordActiveService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private modalService: NzModalService,
    private nzNotificationService: NzNotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userLoginModel = this.authenticationService.getAuthenticationModel();
    this.filterModel.fromDate = new Date(this.dateNow.setHours(0, 0, 0, 0));
    this.filterModel.toDate = new Date(this.dateNow.setHours(23, 59, 59, 999));
    this.filterModel.curator = userLoginModel && userLoginModel.userId;
    this.filterWorkList();
    forkJoin([
      this.dataSourceService.getAllFarmingLocation(),
      this.userService.getAllUser(),
      this.dataSourceService.getAllShrimpCrop(),
      this.masterDataService.getMasterData('WorkStatus,FactorGroup'),
    ]).subscribe(([res1, res2, res3, res4]) => {
      this.farmingLocationData = res1;
      this.userData = res2;
      this.shrimpCropData = res3;
      this.masterDataWorkStatus = res4.find(
        (x) => (x.groupname = 'WorkStatus')
      ).childs;
      this.masterDataFactorGroup = res4.find(
        (x) => (x.groupname = 'FactorGroup')
      ).childs;
    });
  }

  filterWorkList(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.recordActiveService
      .getListWorks(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((result) => {
        this.workData = result.items;
        this.total = result.totalCount;
        this.pageIndex = result.pageIndex + 1;
      });
  }

  deleteFilter(): void {
    this.filterModel = new WorkDataFilter();
    this.filterWorkList();
  }

  changPageSize(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filterWorkList();
  }

  changePageIndex(event: number): void {
    this.filterWorkList(event);
  }

  renderIndex(index: number): number {
    return index + this.pageSize * (this.pageIndex - 1) + 1;
  }

  changeFarmingLocation(event): void {
    this.filterModel.shrimpCropId = null;
    this.shrimpCropDataShow = this.shrimpCropData.filter(
      (x) =>
        x.farmingLocation.id === this.filterModel.farmingLocationId.toString()
    );
  }

  truncateChar(text: string, charlimit): string {
    if (!text || text.length <= charlimit) {
      return text;
    }
    const withouthtml = text.replace(/<(?:.|\n)*?>/gm, '');
    const shortened = withouthtml.substring(0, charlimit) + '...';
    return shortened;
  }

  showDesc(desc: string): void {
    const modal = this.modalService.create({
      nzContent: NotificationPopupComponent,
      nzComponentParams: {
        title: 'Mô tả',
        content: desc,
      },
    });
  }

  disabledStartDate = (fromDate: Date): boolean => {
    if (!fromDate || !this.filterModel.toDate) {
      return false;
    }
    return (
      this.filterModel.toDate &&
      fromDate.getTime() >= this.filterModel.toDate.getTime()
    );
  };

  disabledEndDate = (toDate: Date): boolean => {
    if (!toDate || !this.filterModel.fromDate) {
      return false;
    }
    return (
      this.filterModel.fromDate &&
      toDate.setHours(23, 59, 59, 999) <
      this.filterModel.fromDate.setHours(0, 0, 0, 0)
    );
  };

  viewUpdateHistory(workData: WorkData): void {
    const modal = this.modalService.create({
      nzContent: WorkHistoryPopupComponent,
      nzComponentParams: {
        id: workData.id,
      },
    });
  }

  delete(item: WorkData): void {
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        content: `Bạn có chắc muốn xóa công việc ghi nhận ${item.managementFactor.name} này?`,
      },
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        this.recordActiveService.deleteWork(item.id).subscribe((res) => {
          if (res) {
            this.nzNotificationService.success(
              'Thông báo',
              'Xóa công việc thành công!'
            );
          }
        });
      }
    });
  }

  createOrUpdate(item: WorkData): void {
    this.workDataItem.value = this.workDataItem.value.replace(/[^0-9]*/g, '');
    if (item.value === this.workDataItem.value) {
      this.workDataItem = new WorkData();
      return;
    }
    this.isSubmit = true;
    if (!this.workDataItem.value) {
      return;
    }
    const modelEdit = {
      workId: item.id,
      value: this.workDataItem.value,
      modifiedAt: item.modifiedAt,
    };
    this.recordActiveService.createOrUpdateWork(modelEdit).subscribe((res) => {
      item.value = this.workDataItem.value;
      item.modifiedAt = res.modifiedAt;
      this.workDataItem = new WorkData();
      this.nzNotificationService.success(
        'Thông báo',
        'Ghi nhận giá trị thành công!'
      );
    });
  }

  choseEdit(item: WorkData): void {
    this.workDataItem = { ...item };
  }

  isDeadline(item: WorkData): boolean {
    return (
      item &&
      !item.value &&
      new Date(item.executionTime * 1000).getDate() < this.dateNow.getDate()
    );
  }

  isWarning(item: WorkData): boolean {
    return (
      item &&
      !item.value &&
      new Date(item.executionTime * 1000).getDate() === this.dateNow.getDate()
    );
  }

  showImages(item: WorkData): void {
    this.isShowImage = true;
    this.workDataItem = item;
  }

  closeImageModal(): void {
    this.isShowImage = false;
  }

  onUploadFile(event, item: WorkData): void {
    const fileImage = [];
    const fileList = [...event.target.files];
    if ((item.pictures || []).length + fileList.length > 3) {
      this.nzNotificationService.error(
        'Thông báo',
        'Công việc chỉ có thể có tối đa 3 hình minh chứng'
      );
      return;
    }
    if (fileList.length > 0) {
      const file = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < fileList.length; i++) {
        this.recordActiveService
          .uploadImage(fileList[i])
          .subscribe((res) => {
            (fileImage || []).push(res);
            if (fileImage.length === fileList.length) {
              const requestImageModel = {
                workId: item.id,
                pictures: fileImage,
              };
              this.recordActiveService
                .updateImage(requestImageModel)
                .subscribe((result) => {
                  if (result && result.data) {
                    item.pictures = [...(item.pictures || [])].concat(
                      fileImage
                    );
                    this.cdr.detectChanges();
                    this.nzNotificationService.success(
                      'Thông báo',
                      'Thêm hình ảnh minh chứng thành công'
                    );
                  }
                });
            }
          });
      }
    }
    event.target.value = null;
  }
}
