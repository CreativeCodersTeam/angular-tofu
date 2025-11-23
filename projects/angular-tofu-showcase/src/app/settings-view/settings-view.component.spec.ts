import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SettingsViewComponent} from './settings-view.component';
import {provideZonelessChangeDetection} from "@angular/core";

describe('SettingsViewComponent', () => {
  let component: SettingsViewComponent;
  let fixture: ComponentFixture<SettingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsViewComponent],
      providers: [
        provideZonelessChangeDetection()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
