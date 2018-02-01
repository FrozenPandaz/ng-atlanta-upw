import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LanderRoutingModule } from './lander-routing.module';
import { LanderComponent } from './lander.component';

@NgModule({
  imports: [
    CommonModule,
    LanderRoutingModule
  ],
  declarations: [
    LanderComponent
  ]
})
export class LanderModule { }
