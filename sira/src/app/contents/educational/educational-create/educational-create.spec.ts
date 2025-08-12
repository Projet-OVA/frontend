import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalCreate } from './educational-create';

describe('EducationalCreate', () => {
  let component: EducationalCreate;
  let fixture: ComponentFixture<EducationalCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
