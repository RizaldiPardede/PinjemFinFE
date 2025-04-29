import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResetpasswordComponent } from './form-resetpassword.component';

describe('FormResetpasswordComponent', () => {
  let component: FormResetpasswordComponent;
  let fixture: ComponentFixture<FormResetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormResetpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
