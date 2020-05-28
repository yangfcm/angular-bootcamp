import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModulesRoutingModule } from './ui-modules-routing.module';
import { UiModulesHomeComponent } from './ui-modules-home/ui-modules-home.component';
import { UiModulesModalComponent } from './ui-modules-modal/ui-modules-modal.component';
import { UiModulesAccordionComponent } from './ui-modules-accordion/ui-modules-accordion.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UiModulesHomeComponent,
    UiModulesModalComponent,
    UiModulesAccordionComponent,
  ],
  imports: [CommonModule, UiModulesRoutingModule, SharedModule],
})
export class UiModulesModule {}
