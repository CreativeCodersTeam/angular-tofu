import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TofuNavigationTreeComponent} from '../tofu-navigation-tree';
import {provideZonelessChangeDetection} from '@angular/core';

describe('TofuNavigationTreeComponent', () => {
  let component: TofuNavigationTreeComponent;
  let fixture: ComponentFixture<TofuNavigationTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection()
      ],
      imports: [TofuNavigationTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TofuNavigationTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
