import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerPolicyComponent } from './view-customer-policy.component';

describe('ViewCustomerPolicyComponent', () => {
  let component: ViewCustomerPolicyComponent;
  let fixture: ComponentFixture<ViewCustomerPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCustomerPolicyComponent]
    });
    fixture = TestBed.createComponent(ViewCustomerPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
