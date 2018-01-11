import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LanderModule } from '../lander/lander.module';
import { ProfileModule } from '../profile/profile.module';
import { EditLanderComponent } from './edit-lander/edit-lander.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditRoutingModule } from './edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditRoutingModule,
    AngularFirestoreModule,
    ProfileModule,
    LanderModule
  ],
  declarations: [
    EditLanderComponent,
    EditProfileComponent,
  ]
})
export class EditModule { }
