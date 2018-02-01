import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanderComponent } from './lander.component';

const routes: Routes = [
  {
    path: '',
    component: LanderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanderRoutingModule {
  constructor() {
    console.log('hi hi hi');
  }
}
