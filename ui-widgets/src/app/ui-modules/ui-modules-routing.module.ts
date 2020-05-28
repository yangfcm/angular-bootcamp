import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UiModulesHomeComponent } from './ui-modules-home/ui-modules-home.component';

const routes: Routes = [
  {
    path: '',
    component: UiModulesHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiModulesRoutingModule {}
