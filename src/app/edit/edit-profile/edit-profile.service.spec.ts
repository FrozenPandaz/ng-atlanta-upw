import { TestBed, inject } from '@angular/core/testing';

import { EditProfileService } from './edit-profile.service';

describe('EditProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditProfileService]
    });
  });

  it('should be created', inject([EditProfileService], (service: EditProfileService) => {
    expect(service).toBeTruthy();
  }));
});
