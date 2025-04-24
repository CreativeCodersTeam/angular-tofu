import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TofuSmallNavTreeComponent } from './tofu-small-nav-tree.component';

describe('TofuSmallNavTreeComponent', () => {
  let component: TofuSmallNavTreeComponent;
  let fixture: ComponentFixture<TofuSmallNavTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
