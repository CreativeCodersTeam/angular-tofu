import { TofuNavigationService } from './tofu-navigation.service';
import { inject } from '@angular/core';

export class TofuNavigationEntry {
  // title = '';
  //
  // href = '';
  private navigationService: TofuNavigationService;

  constructor(public title: string, public href: string) {
    this.navigationService = inject(TofuNavigationService);
  }

  public navigate(): void{
    this.navigationService.navigate(this.href);
  }
}
