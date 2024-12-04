import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPolicyComponent } from './car-policy.component';

describe('CarPolicyComponent', () => {
  let component: CarPolicyComponent;
  let fixture: ComponentFixture<CarPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarPolicyComponent]
    });
    fixture = TestBed.createComponent(CarPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
