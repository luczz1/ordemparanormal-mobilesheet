import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementFormatPipe } from './element-format.pipe';
import { ExecutionFormatPipe } from './execution-format.pipe';
import { ReachFormatPipe } from './reach-format.pipe';
import { AttrFormatPipe } from './attr-format.pipe';

@NgModule({
  declarations: [
    ElementFormatPipe,
    ExecutionFormatPipe,
    ReachFormatPipe,
    AttrFormatPipe,
  ],
  imports: [CommonModule],
  exports: [
    ElementFormatPipe,
    ExecutionFormatPipe,
    ReachFormatPipe,
    AttrFormatPipe,
  ],
})
export class PipesModule {}
