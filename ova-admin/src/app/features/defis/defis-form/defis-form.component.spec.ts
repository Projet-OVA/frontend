import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefisFormComponent } from './defis-form.component';

describe('DefisFormComponent', () => {
  let component: DefisFormComponent;
  let fixture: ComponentFixture<DefisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefisFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
