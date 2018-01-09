import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditRoutingModule } from './edit-routing.module';
import { EditLanderComponent } from './edit-lander/edit-lander.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditRoutingModule,
    AngularFirestoreModule
  ],
  declarations: [
    EditLanderComponent,
    EditProfileComponent,
  ]
})
export class EditModule { }
