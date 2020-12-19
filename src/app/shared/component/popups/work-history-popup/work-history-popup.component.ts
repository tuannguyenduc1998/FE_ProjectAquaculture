import { Component, Input, OnInit } from '@angular/core';
import { WorkHistoryData } from 'src/app/shared/models/record-active/note-book/work-history-data.model';
import { RecordActiveService } from 'src/app/shared/services/record-active.service';

@Component({
  selector: 'app-work-history-popup',
  templateUrl: './work-history-popup.component.html',
  styleUrls: ['./work-history-popup.component.scss']
})
export class WorkHistoryPopupComponent implements OnInit {
  @Input() id: string;
  workHistoryData: WorkHistoryData[] = [];
  pageIndex = 1;
  pageSize = 5;
  total = 1;
  constructor(private recordActiveService: RecordActiveService) { }

  ngOnInit(): void {
    this.recordActiveService.getWorkHistory(this.id).subscribe((res) => {
      this.workHistoryData = res;
    });
  }

}
