import { Component, signal } from '@angular/core';
import {
  TofuAppLayoutComponent,
  TofuNavigationEntry,
} from '@cc-team/angular-tofu';

@Component({
  imports: [TofuAppLayoutComponent],
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
          route: '/about2',
        },
      ],
    },
    {
      icon: 'help2',
      title: 'Help',
      entries: [
        {
          icon: 'info',
          title: 'Something about',
          route: '/about',
        },
        {
          icon: 'info',
          title: 'This is short',
          route: '/about2',
        },
      ],
    },
    {
      icon: 'help3',
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
          route: '/about2',
        },
      ],
    },
    {
      icon: 'help4',
      title: 'Help',
      entries: [
        {
          icon: 'info',
          title: 'Something about',
          route: '/about',
        },
        {
          icon: 'info',
          title: 'This is short',
          route: '/about2',
        },
      ],
    },
    {
      icon: 'help5',
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
          route: '/about2',
        },
      ],
    },
    {
      icon: 'help6',
      title: 'Help',
      entries: [
        {
          icon: 'info',
          title: 'Something about',
          route: '/about',
        },
        {
          icon: 'info',
          title: 'This is short',
          route: '/about2',
        },
      ],
    },
  ];
  protected readonly signal = signal;
}
