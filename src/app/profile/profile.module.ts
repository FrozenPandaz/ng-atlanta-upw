import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile/profile.service';
import { ProfileResolver } from './profile/profile.resolver';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [
    ProfileService,
    ProfileResolver
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
