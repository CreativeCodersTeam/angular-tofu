import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {TofuNavigationEntry} from "@cc-team/angular-tofu";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'tofu-navigation-tree',
  imports: [CommonModule, MatNavList, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatIcon, MatListItem, MatListItemIcon, RouterLink],
  templateUrl: './tofu-navigation-tree.component.html',
  styleUrl: './tofu-navigation-tree.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TofuNavigationTreeComponent {
  @Input()
  navEntries: TofuNavigationEntry[] = [];
}
