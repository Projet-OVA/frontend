import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastsList } from './podcasts-list';

describe('PodcastsList', () => {
  let component: PodcastsList;
  let fixture: ComponentFixture<PodcastsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PodcastsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
