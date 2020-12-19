import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordActiveComponent } from './record-active.component';

const routes: Routes = [
  {
    path: '',
    component: RecordActiveComponent,
    children: [
      {
        path: '',
        redirectTo: 'note-book',
        pathMatch: 'full',
      },
      {
        path: 'note-book',
        loadChildren: () =>
          import('./note-book/note-book.module').then(
            (mod) => mod.NoteBookModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordActiveRoutingModule { }
