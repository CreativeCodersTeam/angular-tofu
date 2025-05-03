import { TestBed } from '@angular/core/testing';

import { TofuAppLayoutService } from './tofu-app-layout.service';

describe('TofuAppLayoutService', () => {
  let service: TofuAppLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TofuAppLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
