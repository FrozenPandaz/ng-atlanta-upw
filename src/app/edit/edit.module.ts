import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { EditLanderModule } from './edit-lander/edit-lander.module';
import { EditProfileModule } from './edit-profile/edit-profile.module';
import { EditRoutingModule } from './edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EditRoutingModule,
    AngularFirestoreModule,
    EditLanderModule,
    EditProfileModule
  ]
})
export class EditModule { }
