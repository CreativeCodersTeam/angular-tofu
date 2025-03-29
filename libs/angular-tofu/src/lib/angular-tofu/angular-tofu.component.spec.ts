import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularTofuComponent } from './angular-tofu.component';

describe('AngularTofuComponent', () => {
  let component: AngularTofuComponent;
  let fixture: ComponentFixture<AngularTofuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularTofuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularTofuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
