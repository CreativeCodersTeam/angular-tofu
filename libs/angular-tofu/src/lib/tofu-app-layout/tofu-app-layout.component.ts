import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {TofuNavigationEntry} from '../tofu-navigation-tree/tofu-navigation-entry';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatTooltip} from '@angular/material/tooltip';
import {TofuNavigationTreeComponent} from "../tofu-navigation-tree/tofu-navigation-tree.component";

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
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    RouterLink,
    RouterOutlet,
    MatTooltip,
    TofuNavigationTreeComponent,
  ],
  //encapsulation: ViewEncapsulation.None,
})
export class TofuAppLayoutComponent {
  @Input()
  appTitle = '';

  @Input()
  navEntries: TofuNavigationEntry[] = [];

  @Input()
  menuItemTemplate?: TemplateRef<{ $implicit: TofuNavigationEntry }>;

  @Input()
  menuFolderTemplate?: TemplateRef<{ $implicit: TofuNavigationEntry }>;

  isSmallScreen = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }
}
