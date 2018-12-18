import { TestBed, inject } from '@angular/core/testing';

import { LegoGroupSetsDatabaseService } from './lego-group-sets-database.service';

describe('AllSetsDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegoGroupSetsDatabaseService]
    });
  });

  it('should be created', inject([LegoGroupSetsDatabaseService], (service: LegoGroupSetsDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
