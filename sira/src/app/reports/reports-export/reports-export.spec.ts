import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsExport } from './reports-export';

describe('ReportsExport', () => {
  let component: ReportsExport;
  let fixture: ComponentFixture<ReportsExport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsExport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsExport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
