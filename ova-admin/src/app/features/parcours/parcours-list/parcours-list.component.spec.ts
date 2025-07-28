import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoursListComponent } from './parcours-list.component';

describe('ParcoursListComponent', () => {
  let component: ParcoursListComponent;
  let fixture: ComponentFixture<ParcoursListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcoursListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParcoursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
