import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementFormatPipe } from './element-format.pipe';
import { ExecutionFormatPipe } from './execution-format.pipe';
import { ReachFormatPipe } from './reach-format.pipe';

@NgModule({
  declarations: [ElementFormatPipe, ExecutionFormatPipe, ReachFormatPipe],
  imports: [CommonModule],
  exports: [ElementFormatPipe, ExecutionFormatPipe, ReachFormatPipe],
})
export class PipesModule {}
