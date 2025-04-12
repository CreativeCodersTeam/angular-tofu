import { Component, Input, TemplateRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { TofuNavigationEntry } from './tofu-navigation-entry';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';

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
    NgForOf,
    NgIf,
    NgTemplateOutlet,
  ],
})
export class TofuAppLayoutComponent {
  @Input()
  appTitle = '';

  @Input()
  navEntries: TofuNavigationEntry[] = [];

  @Input()
  menuItemTemplate?: TemplateRef<unknown>;

  isSmallScreen = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }
}
