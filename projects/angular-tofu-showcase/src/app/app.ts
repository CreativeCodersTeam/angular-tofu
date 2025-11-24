import {Component, model} from '@angular/core';
import {TofuNavigationEntry, TofuAppLayoutComponent} from 'angular-tofu';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'ats-root',
  imports: [TofuAppLayoutComponent, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = model<string>('Angular Tofu Showcase');

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
          title: 'More Sub',
          route: '/about2'
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
}
