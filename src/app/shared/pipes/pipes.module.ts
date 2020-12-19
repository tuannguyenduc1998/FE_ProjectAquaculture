import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateWordPipe } from './truncate-word.pipe';
@NgModule({
  declarations: [
    TruncateWordPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TruncateWordPipe
  ],
})
export class PipesModule { }
