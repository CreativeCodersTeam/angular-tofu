import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularTofuModule } from '@cc-team/angular-tofu';

@Component({
  imports: [RouterModule, AngularTofuModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-tofu-showcase';
}
