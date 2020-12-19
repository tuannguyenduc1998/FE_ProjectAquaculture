import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteBookListComponent } from './note-book-list/note-book-list.component';
import { NoteBookComponent } from './note-book.component';
const routes: Routes = [
  {
    path: '',
    component: NoteBookComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: NoteBookListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteBookRoutingModule { }
