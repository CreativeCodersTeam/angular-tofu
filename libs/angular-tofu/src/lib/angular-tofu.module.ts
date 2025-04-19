import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatIconButton,
  ],
  declarations: [],
  exports: [],
})
export class AngularTofuModule {
}
