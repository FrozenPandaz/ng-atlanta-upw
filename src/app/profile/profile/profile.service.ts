import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(profileSlug: string): Observable<Profile> {
    return this.http.get<Profile>('api/profile/' + profileSlug);
  }
}
