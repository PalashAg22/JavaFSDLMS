import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAdminComponent } from './account-admin.component';

describe('AccountAdminComponent', () => {
  let component: AccountAdminComponent;
  let fixture: ComponentFixture<AccountAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountAdminComponent]
    });
    fixture = TestBed.createComponent(AccountAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
