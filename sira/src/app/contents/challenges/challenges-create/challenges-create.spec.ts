import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesCreate } from './challenges-create';

describe('ChallengesCreate', () => {
  let component: ChallengesCreate;
  let fixture: ComponentFixture<ChallengesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengesCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
