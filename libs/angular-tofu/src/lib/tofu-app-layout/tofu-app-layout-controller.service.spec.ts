import { TestBed } from '@angular/core/testing';

import { TofuAppLayoutControllerService } from './tofu-app-layout-controller.service';

describe('TofuAppLayoutControllerService', () => {
  let service: TofuAppLayoutControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TofuAppLayoutControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
