import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ElementsHomeComponent } from './elements-home/elements-home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { TimesDirective } from './times.directive';
import { SegmentComponent } from './segment/segment.component';

@NgModule({
  declarations: [ElementsHomeComponent, PlaceholderComponent, TimesDirective, SegmentComponent], // The components, pipes, directives created in this module
  imports: [CommonModule, ElementsRoutingModule, SharedModule], // The modules that this module depends on
  exports: [], // The components, pipes and directives that are exposed to other modules
})
export class ElementsModule {}
