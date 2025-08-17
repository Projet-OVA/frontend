import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeDetail } from './badge-detail';

describe('BadgeDetail', () => {
  let component: BadgeDetail;
  let fixture: ComponentFixture<BadgeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
