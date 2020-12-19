import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { FarmingLocationPopupComponent } from 'src/app/shared/component/popups/farming-location-popup/farming-location-popup.component';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { DataFilter } from 'src/app/shared/models/data-source/dataFilter.model';
import { FarmingLocationItem } from 'src/app/shared/models/data-source/farming-location/farming-location-item.model';
import { FarmingLocationListData } from 'src/app/shared/models/data-source/farming-location/farming-location-listdata.model';
import { GenerateItemType } from 'src/app/shared/models/generate-masterdata/generate-itemtype.model';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './farming-location-list.component.html',
  styleUrls: ['./farming-location-list.component.scss'],
})
export class FarmingLocationListComponent implements OnInit {
  farminglocationTypeData: GenerateItemType[];
  farmingLocationListData = new FarmingLocationListData();
  filterModel = new DataFilter();
  searchTerm$ = new BehaviorSubject('');
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  constructor(
    private dataSourceService: DataSourceService,
    private masterDataService: MasterDataService,
    private modalService: NzModalService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.masterDataService.getMasterData('LocationType'),
    ]).subscribe(([res1]) => {
      this.farminglocationTypeData = res1.find(
        (x) => x.groupName === 'LocationType'
      ).childs;
    });
    this.searchTerm$.pipe(debounceTime(200)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filterFarmingLocationList();
    });
  }

  filterFarmingLocationList(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.dataSourceService
      .getListFarmingLocation(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((result) => {
        this.farmingLocationListData = result;
        this.total = this.farmingLocationListData.totalCount;
        this.pageIndex = this.farmingLocationListData.pageIndex + 1;
      });
  }

  changPageSize(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filterFarmingLocationList();
  }

  changePageIndex(event: number): void {
    this.filterFarmingLocationList(event);
  }

  truncateChar(text: string): string {
    const charlimit = 25;
    if (!text || text.length <= charlimit) {
      return text;
    }

    const withouthtml = text.replace(/<(?:.|\n)*?>/gm, '');
    const shortened = withouthtml.substring(0, charlimit) + '...';
    return shortened;
  }

  delete(itemData: FarmingLocationItem): void{
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        content: 'Bạn có chắc muốn xóa ao nuôi này không?'
      }
    });
    modal.afterClose.subscribe(res => {
      if (res && res.data){
        this.dataSourceService.deleteFarmingLocation(itemData.id).subscribe((result) => {
          itemData.status = new GenerateItemType('Delete', 'Đã xóa', 'Đã xóa', 'Delete');
          this.notificationService.success('Thông báo', 'Xóa thành công ao nuôi');
        });
      }
    });
  }

  createOrUpdateLocation(dataFarmingLocation: FarmingLocationItem = new FarmingLocationItem() ): void{
    const modal = this.modalService.create({
      nzContent: FarmingLocationPopupComponent,
      nzComponentParams: {
        dataFarmingLocation
      }
    });
    modal.afterClose.subscribe((result) => {
      if (result) {
        this.filterFarmingLocationList();
      }
    });
  }

  showDesc(desc: string): void{
    const modal = this.modalService.create({
      nzContent: NotificationPopupComponent,
      nzComponentParams: {
        title: 'Mô tả',
        content: desc
      }
    });
  }
}
