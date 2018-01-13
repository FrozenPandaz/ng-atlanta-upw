import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'edit',
    loadChildren: './edit/edit.module#EditModule'
  },
  {
    path: ':listName',
    loadChildren: './lander/lander.module#LanderModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'fictional-power-women'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
