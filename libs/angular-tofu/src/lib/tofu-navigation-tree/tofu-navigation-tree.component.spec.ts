import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TofuNavigationTreeComponent} from '../tofu-navigation-tree';

describe('TofuNavigationTreeComponent', () => {
  let component: TofuNavigationTreeComponent;
  let fixture: ComponentFixture<TofuNavigationTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
