import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommissionComponent } from './view-commission.component';

describe('ViewCommissionComponent', () => {
  let component: ViewCommissionComponent;
  let fixture: ComponentFixture<ViewCommissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCommissionComponent]
    });
    fixture = TestBed.createComponent(ViewCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
