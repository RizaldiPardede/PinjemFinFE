import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenPlafonComponent } from './manajemen-plafon.component';

describe('ManajemenPlafonComponent', () => {
  let component: ManajemenPlafonComponent;
  let fixture: ComponentFixture<ManajemenPlafonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManajemenPlafonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManajemenPlafonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
