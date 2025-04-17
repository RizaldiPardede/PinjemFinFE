import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanBranchmanagerComponent } from './pengajuan-branchmanager.component';

describe('PengajuanBranchmanagerComponent', () => {
  let component: PengajuanBranchmanagerComponent;
  let fixture: ComponentFixture<PengajuanBranchmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PengajuanBranchmanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanBranchmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
