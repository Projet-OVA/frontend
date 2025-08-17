import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsage } from './dashboard-usage';

describe('DashboardUsage', () => {
  let component: DashboardUsage;
  let fixture: ComponentFixture<DashboardUsage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUsage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUsage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
