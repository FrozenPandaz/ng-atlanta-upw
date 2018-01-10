import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '_appshell',
    loadChildren: './empty/empty.module#EmptyModule'
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
