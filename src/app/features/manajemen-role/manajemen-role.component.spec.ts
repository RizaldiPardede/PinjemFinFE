import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenRoleComponent } from './manajemen-role.component';

describe('ManajemenRoleComponent', () => {
  let component: ManajemenRoleComponent;
  let fixture: ComponentFixture<ManajemenRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManajemenRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManajemenRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
