import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { TofuNavigationEntry } from '../tofu-navigation-tree';
import { RouterOutlet } from '@angular/router';
import { TofuNavigationTreeComponent } from '../tofu-navigation-tree';
import { NgIf } from '@angular/common';
import { TofuAppMessagingService } from '../tofu-app-messaging';
import { Subscription } from 'rxjs';
import { TofuAppLayoutConsts } from './tofu-app-layout-consts';

@Component({
  selector: 'tofu-app-layout',
  templateUrl: './tofu-app-layout.component.html',
  styleUrl: './tofu-app-layout.component.scss',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatIconButton,
    RouterOutlet,
    TofuNavigationTreeComponent,
    NgIf,
  ],
})
export class TofuAppLayoutComponent implements OnInit, OnDestroy {
  @Input()
  appTitle = '';

  @Input()
  navEntries: TofuNavigationEntry[] = [];

  @Input()
  menuItemTemplate?: TemplateRef<{ $implicit: TofuNavigationEntry }>;

  @Input()
  menuFolderTemplate?: TemplateRef<{ $implicit: TofuNavigationEntry }>;

  isSmallScreen = false;

  @Input()
  canShowSmallMenu = true;

  showSmallMenu = false;

  navWidth = '300px';

  private breakpointObserverSubscription: Subscription | undefined;

  private appTitleSubscription: Subscription | undefined;

  public toggleSmallMenu() {
    this.showSmallMenu = !this.showSmallMenu;

    this.navWidth = this.showSmallMenu ? '48px' : '300px';
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appMessagingService: TofuAppMessagingService
  ) {}

  ngOnDestroy(): void {
    this.breakpointObserverSubscription?.unsubscribe();
    this.appTitleSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.breakpointObserverSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });

    this.appTitleSubscription =
      this.appMessagingService.registerWithCallback<string>(
        TofuAppLayoutConsts.MSG_SET_APP_TITLE,
        (title) => {
          this.appTitle = title;
        }
      );
  }
}
