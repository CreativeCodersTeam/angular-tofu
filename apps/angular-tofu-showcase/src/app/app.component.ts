import { Component } from '@angular/core';
import {
  TofuAppLayoutComponent,
  TofuNavigationEntry,
} from '@cc-team/angular-tofu';
import { MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [TofuAppLayoutComponent, MatListItem, MatIcon],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-tofu-showcase';

  navEntries: TofuNavigationEntry[] = [
    {
      icon: 'home',
      title: 'Home',
      route: '',
    },
    {
      icon: 'settings',
      title: 'Settings',
      route: '/settings',
    },
    {
      icon: 'help',
      title: 'Help',
      entries: [
        {
          icon: 'info',
          title: 'About',
          route: '/about',
        },
        {
          icon: 'info',
          title: 'This is a very long title that should be cut off',
          route: '/about',
        },
      ],
    },
  ];
}
