import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecitsFormComponent } from './recits-form.component';

describe('RecitsFormComponent', () => {
  let component: RecitsFormComponent;
  let fixture: ComponentFixture<RecitsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecitsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
