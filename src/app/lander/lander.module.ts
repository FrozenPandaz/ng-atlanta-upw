import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanderComponent } from './lander.component';
import { LanderRoutingModule } from './lander-routing.module';
import { ListResolver } from './list/list.resolver';

@NgModule({
  imports: [
    CommonModule,
    LanderRoutingModule
  ],
  declarations: [LanderComponent],
  providers: [
    ListResolver
  ]
})
export class LanderModule { }
