import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBadges } from './dashboard-badges';

describe('DashboardBadges', () => {
  let component: DashboardBadges;
  let fixture: ComponentFixture<DashboardBadges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBadges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBadges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
