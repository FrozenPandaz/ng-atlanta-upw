import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanderComponent } from './lander.component';
import { LanderRoutingModule } from './lander-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LanderRoutingModule
  ],
  declarations: [LanderComponent]
})
export class LanderModule { }
