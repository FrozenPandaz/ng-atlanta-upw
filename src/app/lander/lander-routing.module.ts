import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanderComponent } from './lander.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LanderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanderRoutingModule { }
