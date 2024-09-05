import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CaseFilterPipe } from './search.pipe';

@NgModule({
  declarations: [CaseFilterPipe],
  imports: [FormsModule],
  exports: [CaseFilterPipe]
})
export class PipeModule { }