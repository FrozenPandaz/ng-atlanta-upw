import { inject, TestBed } from '@angular/core/testing';

import { EditLanderService } from './edit-lander.service';

describe('EditLanderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditLanderService]
    });
  });

  it('should be created', inject([EditLanderService], (service: EditLanderService) => {
    expect(service).toBeTruthy();
  }));
});
