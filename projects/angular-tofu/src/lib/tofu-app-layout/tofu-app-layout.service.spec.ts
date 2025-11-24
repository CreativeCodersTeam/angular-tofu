import { TestBed } from '@angular/core/testing';

import { TofuAppLayoutService } from './tofu-app-layout.service';
import {provideZonelessChangeDetection} from '@angular/core';

describe('TofuAppLayoutService', () => {
  let service: TofuAppLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection()
      ],
    });
    service = TestBed.inject(TofuAppLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
