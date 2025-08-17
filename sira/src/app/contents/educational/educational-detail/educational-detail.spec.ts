import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalDetail } from './educational-detail';

describe('EducationalDetail', () => {
  let component: EducationalDetail;
  let fixture: ComponentFixture<EducationalDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
