import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAkunMarketingComponent } from './detail-akun-marketing.component';

describe('DetailAkunMarketingComponent', () => {
  let component: DetailAkunMarketingComponent;
  let fixture: ComponentFixture<DetailAkunMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAkunMarketingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAkunMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
