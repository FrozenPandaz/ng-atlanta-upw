import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { LanderModule } from '../../lander/lander.module';
import { EditLanderComponent } from './edit-lander.component';

@NgModule({
  imports: [
    CommonModule,
    LanderModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditLanderComponent
  ],
  exports: [
    EditLanderComponent
  ]
})
export class EditLanderModule {}
