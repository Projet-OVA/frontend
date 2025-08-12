import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesEdit } from './challenges-edit';

describe('ChallengesEdit', () => {
  let component: ChallengesEdit;
  let fixture: ComponentFixture<ChallengesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
