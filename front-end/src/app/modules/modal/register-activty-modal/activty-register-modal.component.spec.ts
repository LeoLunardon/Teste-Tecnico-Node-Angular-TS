import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRegisterModalComponent } from './activty-register-modal.component';

describe('ActivtyRegisterModalComponent', () => {
  let component: ActivityRegisterModalComponent;
  let fixture: ComponentFixture<ActivityRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityRegisterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
