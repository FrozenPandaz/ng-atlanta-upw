import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from '../../profile/profile.module';
import { EditProfileComponent } from './edit-profile.component';
import { EditProfileService } from './edit-profile.service';

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditProfileComponent
  ],
  providers: [EditProfileService]
})
export class EditProfileModule { }
