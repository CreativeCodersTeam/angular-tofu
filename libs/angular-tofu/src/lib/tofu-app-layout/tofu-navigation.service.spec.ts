import { TestBed } from '@angular/core/testing';

import { TofuNavigationService } from './tofu-navigation.service';

describe('TofuNavigationService', () => {
  let service: TofuNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TofuNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
