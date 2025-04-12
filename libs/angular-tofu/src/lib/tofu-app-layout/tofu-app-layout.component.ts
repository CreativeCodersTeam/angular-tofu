import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'tofu-app-layout',
  standalone: false,
  templateUrl: './tofu-app-layout.component.html',
  styleUrl: './tofu-app-layout.component.scss',
})
export class TofuAppLayoutComponent {
  title = 'Angular Demo App';

  isSmallScreen = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }
}
