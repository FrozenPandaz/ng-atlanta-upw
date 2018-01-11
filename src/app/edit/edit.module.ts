import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditRoutingModule } from './edit-routing.module';
import { EditLanderComponent } from './edit-lander/edit-lander.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ProfileModule } from '../profile/profile.module';
import { LanderModule } from '../lander/lander.module';

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
