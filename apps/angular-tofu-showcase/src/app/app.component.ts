import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TofuAppLayoutComponent } from '@cc-team/angular-tofu';

@Component({
  imports: [NxWelcomeComponent, RouterModule, TofuAppLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-tofu-showcase';
}
