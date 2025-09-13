import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // base API (utilise /api comme dans ta doc)
  private baseUrl = 'https://sira-backendv1.onrender.com/api';

  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('token'); // si tu utilises JWT côté front
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
    // Si payload est FormData, on l'envoie tel quel, sinon JSON
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
}
