import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Profile } from './profile';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Profile> {
    return this.profileService.getProfile(route.params.profileSlug);
  }
}
