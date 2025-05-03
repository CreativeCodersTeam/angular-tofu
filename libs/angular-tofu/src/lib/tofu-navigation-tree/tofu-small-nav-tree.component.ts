import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TofuNavigationEntry} from "@cc-team/angular-tofu";
import {MatNavList} from "@angular/material/list";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'tofu-small-nav-tree',
  imports: [CommonModule, MatNavList, MatIconButton, MatIcon, RouterLink, RouterLinkActive, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './tofu-small-nav-tree.component.html',
  styleUrl: './tofu-small-nav-tree.component.scss',
})
export class TofuSmallNavTreeComponent {
  @Input()
  navEntries: TofuNavigationEntry[] = [];
}
