import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';

import { ProfileResolver } from './profile/profile.resolver';

const routes: Routes = [
  {
    path: ':profileSlug',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
