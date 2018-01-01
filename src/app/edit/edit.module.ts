import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditRoutingModule } from './edit-routing.module';
import { EditLanderComponent } from './edit-lander/edit-lander.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FirebaseModule } from '../firebase.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FirebaseModule,
    EditRoutingModule
  ],
  declarations: [
    EditLanderComponent,
    EditProfileComponent
  ]
})
export class EditModule { }
