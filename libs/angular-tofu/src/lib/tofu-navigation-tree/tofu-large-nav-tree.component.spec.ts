import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TofuLargeNavTreeComponent } from './tofu-large-nav-tree.component';

describe('TofuLargeNavTreeComponent', () => {
  let component: TofuLargeNavTreeComponent;
  let fixture: ComponentFixture<TofuLargeNavTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
