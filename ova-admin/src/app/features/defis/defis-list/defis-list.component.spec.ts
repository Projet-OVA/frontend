import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefisListComponent } from './defis-list.component';

describe('DefisListComponent', () => {
  let component: DefisListComponent;
  let fixture: ComponentFixture<DefisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefisListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
