import { TofuNavigationService } from './tofu-navigation.service';
import { inject } from '@angular/core';

export class TofuNavigationEntry {
  title = '';

  href = '';
  private navigationService: TofuNavigationService;

  constructor(title: string, href: string) {
    this.title = title;
    this.href = href;

    this.navigationService = inject(TofuNavigationService);
  }

  public navigate(): void{
    this.navigationService.navigate(this.href);
  }
}
