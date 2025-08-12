import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalList } from './educational-list';

describe('EducationalList', () => {
  let component: EducationalList;
  let fixture: ComponentFixture<EducationalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
