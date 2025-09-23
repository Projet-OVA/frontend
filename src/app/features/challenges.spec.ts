import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengesComponent } from './challenges';
import { ApiService } from '../core/api.service';
import { of, throwError } from 'rxjs';

describe('ChallengesComponent', () => {
  let component: ChallengesComponent;
  let fixture: ComponentFixture<ChallengesComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getEvents', 'createEvent', 'updateEvent', 'deleteEvent']);
    
    await TestBed.configureTestingModule({
      imports: [ChallengesComponent],
      providers: [{ provide: ApiService, useValue: apiSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengesComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load challenges on init', () => {
    const mockChallenges = [{ id: '1', title: 'Test Challenge' }];
    apiService.getEvents.and.returnValue(of(mockChallenges));
    
    component.ngOnInit();
    
    expect(apiService.getEvents).toHaveBeenCalled();
    expect(component.challenges).toEqual(mockChallenges);
  });

  it('should handle load error', () => {
    apiService.getEvents.and.returnValue(throwError(() => new Error('Error')));
    
    component.loadChallenges();
    
    expect(component.error).toBe('Erreur chargement');
  });
});