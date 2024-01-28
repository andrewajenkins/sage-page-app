import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SageAppComponent } from './sage-app.component';

describe('SageAppComponent', () => {
  let component: SageAppComponent;
  let fixture: ComponentFixture<SageAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SageAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SageAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
