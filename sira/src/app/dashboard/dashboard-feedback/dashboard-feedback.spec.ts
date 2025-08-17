import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFeedback } from './dashboard-feedback';

describe('DashboardFeedback', () => {
  let component: DashboardFeedback;
  let fixture: ComponentFixture<DashboardFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
