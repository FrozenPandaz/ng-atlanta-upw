import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    EditRoutingModule
  ],
  declarations: [EditComponent]
})
export class EditModule { }
