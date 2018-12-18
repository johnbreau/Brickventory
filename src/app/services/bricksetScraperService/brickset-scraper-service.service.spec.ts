import { TestBed, inject } from '@angular/core/testing';

import { BricksetScraperServiceService } from './brickset-scraper-service.service';

describe('BricksetScraperServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BricksetScraperServiceService]
    });
  });

  it('should be created', inject([BricksetScraperServiceService], (service: BricksetScraperServiceService) => {
    expect(service).toBeTruthy();
  }));
});
