import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LanderRoutingModule } from './lander-routing.module';
import { LanderComponent } from './lander.component';
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
