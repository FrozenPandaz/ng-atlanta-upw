import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from '../../profile/profile.module';
import { EditProfileComponent } from './edit-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditProfileComponent
  ]
})
export class EditProfileModule { }
