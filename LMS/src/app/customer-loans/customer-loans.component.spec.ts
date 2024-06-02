import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoansComponent } from './customer-loans.component';

describe('CustomerLoansComponent', () => {
  let component: CustomerLoansComponent;
  let fixture: ComponentFixture<CustomerLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerLoansComponent]
    });
    fixture = TestBed.createComponent(CustomerLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
