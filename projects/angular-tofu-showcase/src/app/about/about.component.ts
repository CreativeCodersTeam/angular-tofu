import {Component, model, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {App} from '../app';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  appTitle = model<string>('');

  constructor(private readonly app: App) {
  }

  ngOnInit(): void {
    this.appTitle.set(this.app.title());
  }


}
