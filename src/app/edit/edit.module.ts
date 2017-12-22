import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditRoutingModule
  ],
  declarations: [EditComponent]
})
export class EditModule { }
