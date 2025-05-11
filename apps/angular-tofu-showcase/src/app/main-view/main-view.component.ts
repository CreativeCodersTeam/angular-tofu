import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TofuAppLayoutService } from '@cc-team/angular-tofu';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent {
  constructor(private appLayoutService: TofuAppLayoutService) {}

  setNewAppTitle(newAppTitle: string) {
    this.appLayoutService.setAppTitle(newAppTitle);
  }
}
