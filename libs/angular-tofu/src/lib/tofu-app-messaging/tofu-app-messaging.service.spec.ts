import { TestBed } from '@angular/core/testing';

import { TofuAppMessagingService } from './tofu-app-messaging.service';
import { msg } from 'ng-packagr/lib/utils/log';

describe('TofuAppMessagingService', () => {
  let service: TofuAppMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TofuAppMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute registration callback', (done) => {
    service.register<string>('test', (msg) => {
      if (msg === '1234') {
        done();
      }
    });

    service.sendMessage({ type: 'test', payload: '1234' });
  });

  it('should execute registration callback after unregister', () => {
    const callback = jest.fn();

    const registrationId = service.register<string>('test', callback);

    service.unregister(registrationId);

    service.sendMessage({ type: 'test', payload: '1234' });

    expect(callback).not.toHaveBeenCalled();
  });
});
