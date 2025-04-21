import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenBranchComponent } from './manajemen-branch.component';

describe('ManajemenBranchComponent', () => {
  let component: ManajemenBranchComponent;
  let fixture: ComponentFixture<ManajemenBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManajemenBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManajemenBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
