import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TofuNavigationEntry} from "@cc-team/angular-tofu";
import {TofuLargeNavTreeComponent} from "./tofu-large-nav-tree.component";

@Component({
  selector: 'tofu-navigation-tree',
  imports: [CommonModule, TofuLargeNavTreeComponent],
  templateUrl: './tofu-navigation-tree.component.html',
  styleUrl: './tofu-navigation-tree.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TofuNavigationTreeComponent {
  @Input()
  navEntries: TofuNavigationEntry[] = [];

  @Input()
  hasSmallNavTree = false;
}
