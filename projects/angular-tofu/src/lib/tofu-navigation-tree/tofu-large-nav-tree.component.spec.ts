import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TofuLargeNavTreeComponent } from './tofu-large-nav-tree.component';
import {provideZonelessChangeDetection} from '@angular/core';

describe('TofuLargeNavTreeComponent', () => {
  let component: TofuLargeNavTreeComponent;
  let fixture: ComponentFixture<TofuLargeNavTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection()
      ],
      imports: [TofuLargeNavTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TofuLargeNavTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
