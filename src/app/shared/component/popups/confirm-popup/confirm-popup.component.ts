import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  closeNo(): void {
    this.modal.destroy({ data: false });
  }

  closeYes(): void {
    this.modal.destroy({ data: true });
  }
}
