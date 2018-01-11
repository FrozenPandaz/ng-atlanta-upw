import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile/profile.resolver';
import { ProfileService } from './profile/profile.service';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [
    ProfileService,
    ProfileResolver
  ],
  declarations: [
    ProfileComponent,
    ProfilePageComponent
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
