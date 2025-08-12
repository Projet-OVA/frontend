import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalEdit } from './educational-edit';

describe('EducationalEdit', () => {
  let component: EducationalEdit;
  let fixture: ComponentFixture<EducationalEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
