import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoreComponent} from './more-component';
import {provideZonelessChangeDetection} from "@angular/core";

describe('MoreComponent', () => {
  let component: MoreComponent;
  let fixture: ComponentFixture<MoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreComponent],
      providers: [
        provideZonelessChangeDetection()
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
