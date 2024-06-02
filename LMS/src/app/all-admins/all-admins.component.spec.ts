import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdminsComponent } from './all-admins.component';

describe('AllAdminsComponent', () => {
  let component: AllAdminsComponent;
  let fixture: ComponentFixture<AllAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAdminsComponent]
    });
    fixture = TestBed.createComponent(AllAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
