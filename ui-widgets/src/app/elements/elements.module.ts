import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
import { ElementsHomeComponent } from './elements-home/elements-home.component';

@NgModule({
  declarations: [ElementsHomeComponent], // The components, pipes, directives created in this module
  imports: [CommonModule, ElementsRoutingModule], // The modules that this module depends on
  exports: [], // The components, pipes and directives that are exposed to other modules
})
export class ElementsModule {}
