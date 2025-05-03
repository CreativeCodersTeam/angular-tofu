import { TestBed } from '@angular/core/testing';
import { TofuAppMessagingService } from './tofu-app-messaging.service';

describe('TofuAppMessagingService', () => {
  let service: TofuAppMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TofuAppMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute registration callback on sendMessage', (done) => {
    service.registerWithCallback('test', (msg) => {
      if (msg === '1234') {
        done();
      }
    });

    service.sendMessage({ type: 'test', payload: '1234' });
  });

  it('should execute registration callback on send', (done) => {
    service.registerWithCallback('test', (msg) => {
      if (msg === '1234') {
        done();
      }
    });

    service.send('test', '1234');
  });

  it('should not execute callback after unsubscribe', () => {
    const callback = jest.fn();

    const subscription = service.registerWithCallback<string>('test', callback);

    subscription.unsubscribe();

    service.sendMessage({ type: 'test', payload: '1234' });

    expect(callback).not.toHaveBeenCalled();
  });
});
