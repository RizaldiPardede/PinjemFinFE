import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanBackofficeComponent } from './pengajuan-backoffice.component';

describe('PengajuanBackofficeComponent', () => {
  let component: PengajuanBackofficeComponent;
  let fixture: ComponentFixture<PengajuanBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PengajuanBackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
