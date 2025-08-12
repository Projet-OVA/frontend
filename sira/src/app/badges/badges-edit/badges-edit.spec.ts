import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesEdit } from './badges-edit';

describe('BadgesEdit', () => {
  let component: BadgesEdit;
  let fixture: ComponentFixture<BadgesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
