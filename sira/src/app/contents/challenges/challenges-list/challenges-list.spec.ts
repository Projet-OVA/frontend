import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesList } from './challenges-list';

describe('ChallengesList', () => {
  let component: ChallengesList;
  let fixture: ComponentFixture<ChallengesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
