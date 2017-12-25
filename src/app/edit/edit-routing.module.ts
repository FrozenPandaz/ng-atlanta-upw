import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditLanderComponent } from './edit-lander/edit-lander.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: ':listName',
    component: EditLanderComponent
  },
  {
    path: 'profile/:profileSlug',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
