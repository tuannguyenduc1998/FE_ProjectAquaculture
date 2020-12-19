import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkData } from 'src/app/shared/models/record-active/note-book/work-data.model';
import { RecordActiveService } from 'src/app/shared/services/record-active.service';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent implements OnInit {
  @Input() workModel = new WorkData();
  @Input() id: string;
  @Output() closed = new EventEmitter<boolean>();
  currentImage: string;
  index = 0;
  url = 'http://demo.bys.vn/api/file/';
  constructor(private recordActiveService: RecordActiveService) { }

  ngOnInit(): void {
    this.currentImage = this.workModel.pictures[0].id;
  }

  nextMove(): void{
    this.index = this.index < this.workModel.pictures.length - 1 ? this.index + 1 : 0 ;
    this.currentImage = this.workModel.pictures[this.index].id;
  }

  clickImg(index): void{
    this.currentImage = this.workModel.pictures[index].id;
    this.index = index;
  }

  closeImageModal(): void
  {
    this.closed.emit(true);
  }

  deleteImage(index: number): void{
    const requestImage = {
      workId: this.workModel.id,
      picture: this.workModel.pictures[index]
    };
    this.recordActiveService.deleteImage(requestImage).subscribe((res) => {
      if (res){
        this.workModel.pictures.splice(index, 1);
        if (this.workModel.pictures.length){
          this.currentImage = this.workModel.pictures[0].id;
        }
        if (this.workModel.pictures.length === 0){
          this.closeImageModal();
        }
      }
    });
  }
}
