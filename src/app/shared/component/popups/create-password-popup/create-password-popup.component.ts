import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-create-password-popup',
  templateUrl: './create-password-popup.component.html',
  styleUrls: ['./create-password-popup.component.scss'],
})
export class CreatePasswordPopupComponent implements OnInit {
  @Input() newPassword: string;
  @Input() userName: string;
  @Input() title: string;
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {}

  closeNo(): void {
    this.modal.destroy({ data: false });
  }

  closeYes(): void {
    this.modal.destroy({ data: true });
  }

  copyText(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.closeYes();
  }
}
