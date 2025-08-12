import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quotas } from './quotas';

describe('Quotas', () => {
  let component: Quotas;
  let fixture: ComponentFixture<Quotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quotas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quotas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
