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

  // Dans api.service.ts
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

  getCourses(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/course`, { headers: this.authHeaders() }).pipe(
      map((res) => {
        console.log('📦 Réponse brute GET /course :', res);

        if (Array.isArray(res?.courses)) {
          console.log('✅ Tableau trouvé dans res.courses');
          return res.courses;
        }

        console.warn('⚠️ Format inattendu pour GET /course');
        return [];
      }),
      catchError((err) => {
        console.error('❌ API getCourses error', err);
        return throwError(() => err);
      })
    );
  }

  getCourse(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/course/${id}`, { headers: this.authHeaders() });
  }

  createCourse(form: FormData): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/course`, form, { headers: this.authHeaders() })
      .pipe(
        catchError((err) => {
          console.error('API createCourse error', err);
          return throwError(() => err);
        })
      );
  }

  updateCourse(id: string, payload: any): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/course/${id}`, payload, { headers: this.authHeaders() })
      .pipe(
        catchError((err) => {
          console.error('API updateCourse error', err);
          return throwError(() => err);
        })
      );
  }

  deleteCourse(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/course/${id}`, { headers: this.authHeaders() })
      .pipe(
        catchError((err) => {
          console.error('API deleteCourse error', err);
          return throwError(() => err);
        })
      );
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

  createQuiz(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz`, payload, { headers: this.authHeaders() });
  }
}
