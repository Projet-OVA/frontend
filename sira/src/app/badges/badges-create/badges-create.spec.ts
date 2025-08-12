import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesCreate } from './badges-create';

describe('BadgesCreate', () => {
  let component: BadgesCreate;
  let fixture: ComponentFixture<BadgesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgesCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
