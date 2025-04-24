import {
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {TofuNavigationEntry} from '../tofu-navigation-tree';
import {RouterOutlet} from '@angular/router';
import {TofuNavigationTreeComponent} from "../tofu-navigation-tree";
import {NgIf} from "@angular/common";

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
    MatAnchor,
    NgIf,
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

  @Input()
  canShowSmallMenu = true;

  showSmallMenu = false;

  navWidth = "300px";

  public toggleSmallMenu() {
    this.showSmallMenu = !this.showSmallMenu;

    this.navWidth = this.showSmallMenu ? "48px" : "300px";
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }
}
