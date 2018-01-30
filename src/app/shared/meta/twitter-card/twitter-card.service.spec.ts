import { TestBed, inject } from '@angular/core/testing';

import { TwitterCardService } from './twitter-card.service';

describe('TwitterCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwitterCardService]
    });
  });

  it('should be created', inject([TwitterCardService], (service: TwitterCardService) => {
    expect(service).toBeTruthy();
  }));
});
