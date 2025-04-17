import { Route } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { AboutComponent } from './about/about.component';
import { SettingsViewComponent } from './settings-view/settings-view.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainViewComponent,
  },
  {
    path: 'settings',
    component: SettingsViewComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
