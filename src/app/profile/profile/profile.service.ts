import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Profile } from './profile';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(profileSlug: string): Observable<Profile> {
    return this.http.get<Profile>('api/profile/' + profileSlug);
  }
}
