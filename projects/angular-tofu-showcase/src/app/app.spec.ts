import {TestBed} from '@angular/core/testing';
import {App} from './app';
import {RouterModule} from '@angular/router';
import {provideZonelessChangeDetection} from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection()
      ],
      imports: [App, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it(`should have as title 'angular-tofu-showcase'`, () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('Angular Tofu Showcase');
  });
});
