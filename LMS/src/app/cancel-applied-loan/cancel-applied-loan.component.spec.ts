import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAppliedLoanComponent } from './cancel-applied-loan.component';

describe('CancelAppliedLoanComponent', () => {
  let component: CancelAppliedLoanComponent;
  let fixture: ComponentFixture<CancelAppliedLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelAppliedLoanComponent]
    });
    fixture = TestBed.createComponent(CancelAppliedLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
