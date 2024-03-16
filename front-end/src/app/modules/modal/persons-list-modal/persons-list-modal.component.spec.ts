import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsListModalComponent } from './persons-list-modal.component';

describe('PersonsListModalComponent', () => {
  let component: PersonsListModalComponent;
  let fixture: ComponentFixture<PersonsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonsListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
