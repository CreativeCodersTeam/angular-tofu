import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import {
  MatListItem,
  MatListItemIcon,
  MatNavList,
} from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TofuNavigationEntry } from './tofu-navigation-entry';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'tofu-large-nav-tree',
  imports: [
    CommonModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatListItem,
    MatListItemIcon,
    MatNavList,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './tofu-large-nav-tree.component.html',
  styleUrl: './tofu-large-nav-tree.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TofuLargeNavTreeComponent {
  @Input()
  navEntries: TofuNavigationEntry[] = [];
}
