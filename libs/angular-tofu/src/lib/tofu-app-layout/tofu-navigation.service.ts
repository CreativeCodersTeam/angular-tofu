import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TofuNavigationService {
  randomNumber = Math.random();

  constructor() {

  }

  public navigate(href: string): void {
    console.log('Navigating to:', href, this.randomNumber);
    // Implement navigation logic here
  }
}
