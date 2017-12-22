import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanderComponent } from './lander.component';
import { ListResolver } from './list/list.resolver';

const routes: Routes = [
  {
    path: 'edit',
    loadChildren: './edit/edit.module#EditModule'
  },
  {
    path: '',
    component: LanderComponent,
    resolve: {
      list: ListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanderRoutingModule { }
