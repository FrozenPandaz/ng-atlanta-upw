import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Profile> {
    return this.profileService.getProfile(route.params.profileSlug);
  }
}
