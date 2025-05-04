import { Injectable } from '@angular/core';
import { TofuAppMessagingService } from '../tofu-app-messaging';
import { TofuAppLayoutConsts } from './tofu-app-layout-consts';

@Injectable({
  providedIn: 'root',
})
export class TofuAppLayoutService {
  constructor(private appMessagingService: TofuAppMessagingService) {}

  public setAppTitle(title: string): void {
    this.appMessagingService.send(TofuAppLayoutConsts.MSG_SET_APP_TITLE, title);
  }
}
