import { Component, Input, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TofuAppLayoutComponent, TofuNavigationEntry } from '@cc-team/angular-tofu';
import { MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [RouterModule, TofuAppLayoutComponent, MatListItem, MatIcon],
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
      route: '/',
    },
    {
      icon: 'settings',
      title: 'Settings',
      route: '/settings',
    },
    {
      icon: 'help',
      title: 'Help',
      entries:[
        {
          icon: 'about',
          title: 'About',
          route: '/about',
        }
      ]
    },
  ];
}
