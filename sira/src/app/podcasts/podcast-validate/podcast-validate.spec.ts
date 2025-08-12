import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastValidate } from './podcast-validate';

describe('PodcastValidate', () => {
  let component: PodcastValidate;
  let fixture: ComponentFixture<PodcastValidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PodcastValidate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastValidate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
