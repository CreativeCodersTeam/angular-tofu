import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TofuSmallNavTreeComponent } from './tofu-small-nav-tree.component';
import {provideZonelessChangeDetection} from '@angular/core';

describe('TofuSmallNavTreeComponent', () => {
  let component: TofuSmallNavTreeComponent;
  let fixture: ComponentFixture<TofuSmallNavTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection()
      ],
      imports: [TofuSmallNavTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TofuSmallNavTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
