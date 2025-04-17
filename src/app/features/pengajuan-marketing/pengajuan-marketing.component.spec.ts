import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanMarketingComponent } from './pengajuan-marketing.component';

describe('PengajuanMarketingComponent', () => {
  let component: PengajuanMarketingComponent;
  let fixture: ComponentFixture<PengajuanMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PengajuanMarketingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  
});
