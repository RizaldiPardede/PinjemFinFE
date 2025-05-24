import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenCustomerComponent } from './manajemen-customer.component';

describe('ManajemenCustomerComponent', () => {
  let component: ManajemenCustomerComponent;
  let fixture: ComponentFixture<ManajemenCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManajemenCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManajemenCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
