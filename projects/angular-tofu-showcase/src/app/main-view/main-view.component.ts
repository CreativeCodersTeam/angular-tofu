import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TofuAppLayoutService} from 'angular-tofu';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent {
  constructor(private readonly appLayoutService: TofuAppLayoutService) {
  }

  setNewAppTitle(newAppTitle: string) {
    this.appLayoutService.setAppTitle(newAppTitle);
  }
}
