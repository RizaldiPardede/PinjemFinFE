import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenUsersemployeeComponent } from './manajemen-usersemployee.component';

describe('ManajemenUsersemployeeComponent', () => {
  let component: ManajemenUsersemployeeComponent;
  let fixture: ComponentFixture<ManajemenUsersemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManajemenUsersemployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManajemenUsersemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
