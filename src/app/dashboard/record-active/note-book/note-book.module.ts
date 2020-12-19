import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteBookRoutingModule } from './note-book-routing.module';
import { NoteBookListComponent } from './note-book-list/note-book-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteBookComponent } from './note-book.component';


@NgModule({
  declarations: [NoteBookListComponent, NoteBookComponent],
  imports: [
    CommonModule,
    NoteBookRoutingModule,
    SharedModule
  ]
})
export class NoteBookModule { }
