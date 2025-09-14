import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map, catchError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // base API (utilise /api comme dans ta doc)
  private baseUrl = 'https://sira-backendv1.onrender.com/api';

  // constructor(private http: HttpClient) {}
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Gardez seulement cette version qui utilise AuthService
  private authHeaders() {
    const token = this.authService.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  // --- PUBLICATIONS ---
  getPublications(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/publication`, { headers: this.authHeaders() }).pipe(
      map((res) => {
        // Normalise plusieurs formes de réponses possibles
        if (!res) return [];
        if (Array.isArray(res)) return res;
        if (res.data && Array.isArray(res.data)) return res.data;
        if (res.data && res.data.items && Array.isArray(res.data.items)) return res.data.items;
        // si réponse unique dans data
        if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) return [res.data];
        return [];
      }),
      catchError((err) => {
        console.error('API getPublications error', err);
        return throwError(() => err);
      })
    );
  }

  getPublication(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/publication/${id}`, { headers: this.authHeaders() });
  }

  createPublication(form: FormData): Observable<any> {
    const headers = this.authHeaders();
    // Ne pas définir Content-Type : le navigateur s'en occupe pour multipart/form-data
    return this.http.post<any>(`${this.baseUrl}/publication`, form, { headers }).pipe(
      catchError((err) => {
        console.error('API createPublication error', err);
        return throwError(() => err);
      })
    );
  }

  updatePublication(id: string | number, payload: any): Observable<any> {
    const headers = this.authHeaders();
    // Essayez PATCH au lieu de PUT
    return this.http.patch<any>(`${this.baseUrl}/publication/${id}`, payload, { headers }).pipe(
      catchError((err) => {
        console.error('API updatePublication error', err);
        return throwError(() => err);
      })
    );
  }

  deletePublication(id: string | number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/publication/${id}`, { headers: this.authHeaders() })
      .pipe(
        catchError((err) => {
          console.error('API deletePublication error', err);
          return throwError(() => err);
        })
      );
  }

  publishPublication(id: string | number): Observable<any> {
    return this.updatePublication(id, { status: 'PUBLISHED' });
  }

  // --- EVENTS ---
  getEvents(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/events`, { headers: this.authHeaders() }).pipe(
      map((res) => (Array.isArray(res?.data) ? res.data : res?.data?.items ?? [])),
      catchError((err) => {
        console.error('API getEvents error', err);
        return throwError(() => err);
      })
    );
  }

  getEvent(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${id}`, { headers: this.authHeaders() });
  }

  createEvent(form: FormData): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/events`, form, { headers: this.authHeaders() })
      .pipe(
        catchError((err) => {
          console.error('API createEvent error', err);
          return throwError(() => err);
        })
      );
  }

  updateEvent(id: string, payload: any): Observable<any> {
    return this.http
      .patch<any>(`${this.baseUrl}/events/${id}`, payload, { headers: this.authHeaders() })
      .pipe(
        catchError((err) => {
          console.error('API updateEvent error', err);
          return throwError(() => err);
        })
      );
  }

  deleteEvent(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/events/${id}`, { headers: this.authHeaders() })
      .pipe(
        catchError((err) => {
          console.error('API deleteEvent error', err);
          return throwError(() => err);
        })
      );
  }

  // -------------------- Courses --------------------
  getCourses(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/course?page=${page}&limit=${limit}`,
      this.getAuthHeaders()
    );
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/${id}`, this.getAuthHeaders());
  }

  createCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/course`, course, this.getAuthHeaders());
  }

  updateCourse(id: string, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/course/${id}`, course, this.getAuthHeaders());
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/course/${id}`, this.getAuthHeaders());
  }

  getCoursesByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/category/${category}`, this.getAuthHeaders());
  }

  // -------------------- Quizzes --------------------
  createQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz`, quiz, this.getAuthHeaders());
  }

  getQuizById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/${id}`, this.getAuthHeaders());
  }

  updateQuiz(id: string, quiz: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/quiz/${id}`, quiz, this.getAuthHeaders());
  }

  deleteQuiz(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/quiz/${id}`, this.getAuthHeaders());
  }

  getQuizByCourse(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/course/${courseId}`, this.getAuthHeaders());
  }

  submitQuiz(answers: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz/submit`, answers, this.getAuthHeaders());
  }

  // -------------------- Helper --------------------
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // ou via ton AuthService
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`,
      }),
    };
  }

  // Users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/users`, this.getAuthHeaders());
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/users/${id}`, this.getAuthHeaders());
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/users/${id}`, user, this.getAuthHeaders());
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/users/${id}`, this.getAuthHeaders());
  }
}
