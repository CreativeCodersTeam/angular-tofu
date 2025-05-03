import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TofuAppLayoutControllerService } from '@cc-team/angular-tofu';

@Component({
  selector: 'app-main-view',
  imports: [CommonModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent {
  constructor(private appLayoutController: TofuAppLayoutControllerService) {}

  setNewAppTitle(newAppTitle: string) {
    this.appLayoutController.setAppTitle(newAppTitle);
  }
}
