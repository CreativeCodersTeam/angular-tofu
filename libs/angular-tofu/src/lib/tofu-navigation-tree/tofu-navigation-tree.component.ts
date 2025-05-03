import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TofuNavigationEntry} from "@cc-team/angular-tofu";
import {TofuLargeNavTreeComponent} from "./tofu-large-nav-tree.component";
import {TofuSmallNavTreeComponent} from "./tofu-small-nav-tree.component";

@Component({
  selector: 'tofu-navigation-tree',
  imports: [CommonModule, TofuLargeNavTreeComponent, TofuSmallNavTreeComponent],
  templateUrl: './tofu-navigation-tree.component.html',
  styleUrl: './tofu-navigation-tree.component.scss',
})
export class TofuNavigationTreeComponent {
  @Input()
  navEntries: TofuNavigationEntry[] = [];

  @Input()
  hasSmallNavTree = false;
}
