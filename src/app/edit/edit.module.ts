import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditRoutingModule
  ],
  declarations: [EditComponent]
})
export class EditModule { }
