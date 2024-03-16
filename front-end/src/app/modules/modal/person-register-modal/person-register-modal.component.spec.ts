import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRegisterModalComponent } from './person-register-modal.component';

describe('PersonRegisterModalComponent', () => {
  let component: PersonRegisterModalComponent;
  let fixture: ComponentFixture<PersonRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonRegisterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
