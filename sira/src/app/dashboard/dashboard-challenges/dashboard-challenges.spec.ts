import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChallenges } from './dashboard-challenges';

describe('DashboardChallenges', () => {
  let component: DashboardChallenges;
  let fixture: ComponentFixture<DashboardChallenges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChallenges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChallenges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
