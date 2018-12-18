import { TestBed, inject } from '@angular/core/testing';

import { MySetsDatabaseService } from './my-sets-database.service';

describe('MySetsDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySetsDatabaseService]
    });
  });

  it('should be created', inject([MySetsDatabaseService], (service: MySetsDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
