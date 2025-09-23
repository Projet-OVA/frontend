import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses';
import { ApiService } from '../core/api.service';
import { of, throwError } from 'rxjs';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', [
      'getCourses',
      'createCourse',
      'updateCourse',
      'deleteCourse',
    ]);

    await TestBed.configureTestingModule({
      imports: [CoursesComponent],
      providers: [{ provide: ApiService, useValue: apiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    const mockCourses = [{ id: '1', name: 'Test Course' }];
    apiService.getCourses.and.returnValue(of(mockCourses));

    component.ngOnInit();

    expect(apiService.getCourses).toHaveBeenCalled();
    expect(component.courses).toEqual(mockCourses);
  });

  it('should handle load error', () => {
    apiService.getCourses.and.returnValue(throwError(() => new Error('Error')));

    component.loadCourses();

    expect(component.error).toBe('Erreur chargement');
  });
});
