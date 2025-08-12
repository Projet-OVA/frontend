import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Participations } from './participations';

describe('Participations', () => {
  let component: Participations;
  let fixture: ComponentFixture<Participations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Participations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Participations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
