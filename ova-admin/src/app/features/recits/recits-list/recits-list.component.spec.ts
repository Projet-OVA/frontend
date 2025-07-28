import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecitsListComponent } from './recits-list.component';

describe('RecitsListComponent', () => {
  let component: RecitsListComponent;
  let fixture: ComponentFixture<RecitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecitsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
