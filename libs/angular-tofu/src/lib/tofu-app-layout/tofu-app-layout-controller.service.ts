import { Injectable } from '@angular/core';
import { TofuAppMessagingService } from '../tofu-app-messaging/tofu-app-messaging.service';
import { TofuAppLayoutConsts } from './tofu-app-layout-consts';

@Injectable({
  providedIn: 'root',
})
export class TofuAppLayoutControllerService {
  constructor(private appMessagingService: TofuAppMessagingService) {}

  public setAppTitle(title: string): void {
    this.appMessagingService.send(TofuAppLayoutConsts.MSG_SET_APP_TITLE, title);
  }
}
