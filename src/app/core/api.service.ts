import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map, catchError } from 'rxjs';
import { AuthService } from './auth.service';

// Interfaces pour le typage
export interface DashboardData {
  userStats: {
    totalUsers: number;
    activeUsers: number;
  };
  eventStats: {
    totalEvents: number;
  };
  badgeStats: {
    totalBadges: number;
    badgeDistribution: { [key: string]: number };
  };
  courseProgress: {
    completionRate: string;
    completionRateChange: string;
    averageTime: string;
    averageTimeChange: string;
  };
  communityEngagement: {
    engagementRate: string;
    engagementRateChange: string;
  };
}

export interface UserProgress {
  message: string;
  data: {
    userId: string;
    categories: CategoryProgress[];
    overallProgress: number;
    totalCategories: number;
    completedCategories: number;
  };
  statusCode: number;
}

export interface CategoryProgress {
  id: string;
  category: string;
  completedQuizzes: number;
  totalQuizzes: number;
  progressPercentage: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Ajoutez cette interface
export interface EventProposalResponse {
  message: string;
  data: EventProposal | EventProposal[];
  statusCode: number;
}

export interface EventProposal {
  id: string;
  title: string;
  description: string;
  proposedDate: string;
  location: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  proposedBy: {
    id: string;
    username: string;
    email: string;
  };
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  rarity: string;
  category: string;
  xpReward: number;
  criteria: string;
  createdAt?: string; // Rendez createdAt optionnel avec ?
  updatedAt?: string; // Ajoutez updatedAt optionnel aussi
}

export interface BadgeProgress {
  userId: string;
  badges: Badge[];
  totalBadges: number;
  earnedBadges: number;
  progressPercentage: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://sira-backendv1.onrender.com/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private authHeaders() {
    const token = this.authService.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  // ==================== DASHBOARD ====================

  getDashboardData(): Observable<DashboardData> {
    return this.http
      .get<DashboardData>(`${this.baseUrl}/dashboard`, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('API getDashboardData error', err);
          return throwError(() => err);
        })
      );
  }

    getDashboard(): Observable<DashboardData> {
    return this.http
      .get<DashboardData>(`${this.baseUrl}/dashboard`, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('API getDashboardData error', err);
          return throwError(() => err);
        })
      );
  }

  // ==================== PROGRESSION ====================

  getUserProgress(): Observable<UserProgress> {
    return this.http
      .get<UserProgress>(`${this.baseUrl}/progression`, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('API getUserProgress error', err);
          return throwError(() => err);
        })
      );
  }

  getCategoryProgress(category: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/progression/category/${category}`, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('API getCategoryProgress error', err);
          return throwError(() => err);
        })
      );
  }

  // ==================== BADGES ====================

  getAllBadges(): Observable<Badge[]> {
    return this.http
      .get<any>(`${this.baseUrl}/badges/all`, {
        headers: this.authHeaders(),
      })
      .pipe(
        map((response) => {
          // Normalise la réponse selon différents formats possibles
          if (Array.isArray(response)) return response;
          if (response?.data && Array.isArray(response.data)) return response.data;
          if (response?.items && Array.isArray(response.items)) return response.items;
          return [];
        }),
        catchError((err) => {
          console.error('API getAllBadges error', err);
          return throwError(() => err);
        })
      );
  }

  getBadgesProgress(): Observable<BadgeProgress> {
    return this.http
      .get<BadgeProgress>(`${this.baseUrl}/badges/progress`, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('API getBadgesProgress error', err);
          return throwError(() => err);
        })
      );
  }

  getUserBadges(userId: string): Observable<Badge[]> {
    return this.http
      .get<any>(`${this.baseUrl}/badges/user/${userId}`, {
        headers: this.authHeaders(),
      })
      .pipe(
        map((response) => {
          if (Array.isArray(response)) return response;
          if (response?.data && Array.isArray(response.data)) return response.data;
          if (response?.badges && Array.isArray(response.badges)) return response.badges;
          return [];
        }),
        catchError((err) => {
          console.error('API getUserBadges error', err);
          return throwError(() => err);
        })
      );
  }

  getUserBadge(userId: string) {
    return this.http.get<any[]>(`/api/badges/user/${userId}`);
  }
  // ==================== MÉTHODES EXISTANTES (conservées) ====================

  // --- PUBLICATIONS ---
  getPublications(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/publication`, { headers: this.authHeaders() }).pipe(
      map((res) => {
        if (!res) return [];
        if (Array.isArray(res)) return res;
        if (res.data && Array.isArray(res.data)) return res.data;
        if (res.data && res.data.items && Array.isArray(res.data.items)) return res.data.items;
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
    return this.http.post<any>(`${this.baseUrl}/publication`, form, { headers }).pipe(
      catchError((err) => {
        console.error('API createPublication error', err);
        return throwError(() => err);
      })
    );
  }

  updatePublication(id: string | number, payload: any): Observable<any> {
    const headers = this.authHeaders();
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
    return this.http.get(`${this.baseUrl}/course?page=${page}&limit=${limit}`, {
      headers: this.authHeaders(),
    });
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/${id}`, { headers: this.authHeaders() });
  }

  createCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/course`, course, { headers: this.authHeaders() });
  }

  updateCourse(id: string, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/course/${id}`, course, { headers: this.authHeaders() });
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/course/${id}`, { headers: this.authHeaders() });
  }

  getCoursesByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/category/${category}`, {
      headers: this.authHeaders(),
    });
  }

  // -------------------- Quizzes --------------------
  createQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz`, quiz, { headers: this.authHeaders() });
  }

  getQuizById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/${id}`, { headers: this.authHeaders() });
  }

  updateQuiz(id: string, quiz: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/quiz/${id}`, quiz, { headers: this.authHeaders() });
  }

  deleteQuiz(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/quiz/${id}`, { headers: this.authHeaders() });
  }

  getQuizByCourse(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/course/${courseId}`, {
      headers: this.authHeaders(),
    });
  }

  submitQuiz(answers: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz/submit`, answers, { headers: this.authHeaders() });
  }

  // -------------------- Users --------------------
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/users`, { headers: this.authHeaders() });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/users/${id}`, { headers: this.authHeaders() });
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/users/${id}`, user, {
      headers: this.authHeaders(),
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/users/${id}`, { headers: this.authHeaders() });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/admin`, user, { headers: this.authHeaders() });
  }

  createAdmin(adminData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/admin`, adminData, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error creating admin:', error);
          return throwError(() => error);
        })
      );
  }

  // -------------------- Communities --------------------
  getCommunities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/communities`, { headers: this.authHeaders() });
  }

  getCommunityById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/communities/${id}`, { headers: this.authHeaders() });
  }

  createCommunity(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/communities`, data, { headers: this.authHeaders() });
  }

  updateCommunity(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/communities/${id}`, data, {
      headers: this.authHeaders(),
    });
  }

  deleteCommunity(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/communities/${id}`, { headers: this.authHeaders() });
  }

  // ==================== MÉTHODES UTILITAIRES ====================

  /**
   * Génère des données mock pour le développement quand l'API est indisponible
   */
  getMockDashboardData(): DashboardData {
    return {
      userStats: {
        totalUsers: 1542,
        activeUsers: 892,
      },
      eventStats: {
        totalEvents: 47,
      },
      badgeStats: {
        totalBadges: 1284,
        badgeDistribution: {
          NDORTE: 456,
          DJED: 312,
          ANKH: 198,
          LAMAN: 318,
        },
      },
      courseProgress: {
        completionRate: '68.5',
        completionRateChange: '+12.3',
        averageTime: '45m',
        averageTimeChange: '-5.2',
      },
      communityEngagement: {
        engagementRate: '72.1',
        engagementRateChange: '+8.7',
      },
    };
  }

  getMockUserProgress(): UserProgress {
    return {
      message: 'Progression utilisateur récupérée',
      statusCode: 200,
      data: {
        userId: 'user-123',
        overallProgress: 75,
        totalCategories: 4,
        completedCategories: 2,
        categories: [
          {
            id: 'cat-1',
            category: 'ENVIRONNEMENT',
            completedQuizzes: 3,
            totalQuizzes: 5,
            progressPercentage: 60,
            isCompleted: false,
            createdAt: '2025-09-19T21:14:23.443Z',
            updatedAt: '2025-09-19T21:14:23.443Z',
          },
          {
            id: 'cat-2',
            category: 'DROIT_DU_CITOYEN',
            completedQuizzes: 4,
            totalQuizzes: 4,
            progressPercentage: 100,
            isCompleted: true,
            createdAt: '2025-09-19T21:14:23.443Z',
            updatedAt: '2025-09-19T21:14:23.443Z',
          },
        ],
      },
    };
  }

  getMockBadges(): Badge[] {
    return [
      {
        id: '1',
        key: 'NDORTE',
        title: 'Premier pas',
        description: 'Profil complété avec succès',
        icon: '🚀',
        category: 'ONBOARDING',
        criteria: 'Compléter le profil utilisateur',
        rarity: 'COMMON',
        xpReward: 100,
      },
      {
        id: '2',
        key: 'DJED',
        title: 'Stabilité',
        description: 'Progression ≥ 50% dans un parcours',
        icon: '🏛️',
        category: 'PROGRESS',
        criteria: 'Atteindre 50% de progression',
        rarity: 'RARE',
        xpReward: 250,
      },
      {
        id: '3',
        key: 'ANKH',
        title: 'Accomplissement',
        description: 'Parcours terminé à 100%',
        icon: '☥',
        category: 'ACHIEVEMENT',
        criteria: 'Terminer un parcours complet',
        rarity: 'EPIC',
        xpReward: 500,
      },
      {
        id: '4',
        key: 'LAMAN',
        title: 'Communauté',
        description: 'Participation active à la communauté',
        icon: '👥',
        category: 'COMMUNITY',
        criteria: 'Participer à 5 discussions',
        rarity: 'RARE',
        xpReward: 300,
      },
    ];
  }

  // ==================== DÉFIS / PROPOSITIONS D'ÉVÉNEMENTS ====================

  // Ajoutez ces méthodes dans la classe ApiService
  getAllEventProposals(): Observable<EventProposalResponse> {
    return this.http
      .get<EventProposalResponse>(`${this.baseUrl}/event-proposals`, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error getting event proposals:', error);
          return throwError(() => error);
        })
      );
  }

  getEventProposal(id: string): Observable<EventProposalResponse> {
    return this.http
      .get<EventProposalResponse>(`${this.baseUrl}/event-proposals/${id}`, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error getting event proposal:', error);
          return throwError(() => error);
        })
      );
  }

  getPendingEventProposals(): Observable<EventProposalResponse> {
    return this.http
      .get<EventProposalResponse>(`${this.baseUrl}/event-proposals/pending`, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error getting pending proposals:', error);
          return throwError(() => error);
        })
      );
  }

  reviewEventProposal(id: string, action: 'APPROVE' | 'REJECT', comment?: string): Observable<any> {
    const body = {
      action: action,
      comment: comment || '',
    };

    return this.http
      .patch(`${this.baseUrl}/event-proposals/${id}/review`, body, {
        headers: this.authHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error reviewing proposal:', error);
          return throwError(() => error);
        })
      );
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError, map, catchError } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({ providedIn: 'root' })
// export class ApiService {
//   // base API (utilise /api comme dans ta doc)
//   private baseUrl = 'https://sira-backendv1.onrender.com/api';

//   // constructor(private http: HttpClient) {}
//   constructor(private http: HttpClient, private authService: AuthService) {}

//   // Gardez seulement cette version qui utilise AuthService
//   private authHeaders() {
//     const token = this.authService.getToken();
//     return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
//   }

//   // --- PUBLICATIONS ---
//   getPublications(): Observable<any[]> {
//     return this.http.get<any>(`${this.baseUrl}/publication`, { headers: this.authHeaders() }).pipe(
//       map((res) => {
//         // Normalise plusieurs formes de réponses possibles
//         if (!res) return [];
//         if (Array.isArray(res)) return res;
//         if (res.data && Array.isArray(res.data)) return res.data;
//         if (res.data && res.data.items && Array.isArray(res.data.items)) return res.data.items;
//         // si réponse unique dans data
//         if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) return [res.data];
//         return [];
//       }),
//       catchError((err) => {
//         console.error('API getPublications error', err);
//         return throwError(() => err);
//       })
//     );
//   }

//   getPublication(id: string): Observable<any> {
//     return this.http.get<any>(`${this.baseUrl}/publication/${id}`, { headers: this.authHeaders() });
//   }

//   createPublication(form: FormData): Observable<any> {
//     const headers = this.authHeaders();
//     // Ne pas définir Content-Type : le navigateur s'en occupe pour multipart/form-data
//     return this.http.post<any>(`${this.baseUrl}/publication`, form, { headers }).pipe(
//       catchError((err) => {
//         console.error('API createPublication error', err);
//         return throwError(() => err);
//       })
//     );
//   }

//   updatePublication(id: string | number, payload: any): Observable<any> {
//     const headers = this.authHeaders();
//     // Essayez PATCH au lieu de PUT
//     return this.http.patch<any>(`${this.baseUrl}/publication/${id}`, payload, { headers }).pipe(
//       catchError((err) => {
//         console.error('API updatePublication error', err);
//         return throwError(() => err);
//       })
//     );
//   }

//   deletePublication(id: string | number): Observable<any> {
//     return this.http
//       .delete<any>(`${this.baseUrl}/publication/${id}`, { headers: this.authHeaders() })
//       .pipe(
//         catchError((err) => {
//           console.error('API deletePublication error', err);
//           return throwError(() => err);
//         })
//       );
//   }

//   publishPublication(id: string | number): Observable<any> {
//     return this.updatePublication(id, { status: 'PUBLISHED' });
//   }

//   // --- EVENTS ---
//   getEvents(): Observable<any[]> {
//     return this.http.get<any>(`${this.baseUrl}/events`, { headers: this.authHeaders() }).pipe(
//       map((res) => (Array.isArray(res?.data) ? res.data : res?.data?.items ?? [])),
//       catchError((err) => {
//         console.error('API getEvents error', err);
//         return throwError(() => err);
//       })
//     );
//   }

//   getEvent(id: string): Observable<any> {
//     return this.http.get<any>(`${this.baseUrl}/events/${id}`, { headers: this.authHeaders() });
//   }

//   createEvent(form: FormData): Observable<any> {
//     return this.http
//       .post<any>(`${this.baseUrl}/events`, form, { headers: this.authHeaders() })
//       .pipe(
//         catchError((err) => {
//           console.error('API createEvent error', err);
//           return throwError(() => err);
//         })
//       );
//   }

//   updateEvent(id: string, payload: any): Observable<any> {
//     return this.http
//       .patch<any>(`${this.baseUrl}/events/${id}`, payload, { headers: this.authHeaders() })
//       .pipe(
//         catchError((err) => {
//           console.error('API updateEvent error', err);
//           return throwError(() => err);
//         })
//       );
//   }

//   deleteEvent(id: string): Observable<any> {
//     return this.http
//       .delete<any>(`${this.baseUrl}/events/${id}`, { headers: this.authHeaders() })
//       .pipe(
//         catchError((err) => {
//           console.error('API deleteEvent error', err);
//           return throwError(() => err);
//         })
//       );
//   }

//   // -------------------- Courses --------------------
//   getCourses(page: number = 1, limit: number = 10): Observable<any> {
//     return this.http.get(
//       `${this.baseUrl}/course?page=${page}&limit=${limit}`,
//       this.getAuthHeaders()
//     );
//   }

//   getCourseById(id: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/course/${id}`, this.getAuthHeaders());
//   }

//   createCourse(course: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/course`, course, this.getAuthHeaders());
//   }

//   updateCourse(id: string, course: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/course/${id}`, course, this.getAuthHeaders());
//   }

//   deleteCourse(id: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/course/${id}`, this.getAuthHeaders());
//   }

//   getCoursesByCategory(category: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/course/category/${category}`, this.getAuthHeaders());
//   }

//   // -------------------- Quizzes --------------------
//   createQuiz(quiz: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/quiz`, quiz, this.getAuthHeaders());
//   }

//   getQuizById(id: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/quiz/${id}`, this.getAuthHeaders());
//   }

//   updateQuiz(id: string, quiz: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/quiz/${id}`, quiz, this.getAuthHeaders());
//   }

//   deleteQuiz(id: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/quiz/${id}`, this.getAuthHeaders());
//   }

//   getQuizByCourse(courseId: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/quiz/course/${courseId}`, this.getAuthHeaders());
//   }

//   submitQuiz(answers: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/quiz/submit`, answers, this.getAuthHeaders());
//   }

//   // -------------------- Helper --------------------
//   private getAuthHeaders() {
//     const token = localStorage.getItem('token'); // ou via ton AuthService
//     return {
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${token || ''}`,
//       }),
//     };
//   }

//   // Users
//   getUsers(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/auth/users`, this.getAuthHeaders());
//   }

//   getUserById(id: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/auth/users/${id}`, this.getAuthHeaders());
//   }

//   updateUser(id: string, user: any): Observable<any> {
//     return this.http.patch(`${this.baseUrl}/auth/users/${id}`, user, this.getAuthHeaders());
//   }

//   deleteUser(id: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/auth/users/${id}`, this.getAuthHeaders());
//   }

//   // Communities

//   getCommunityById(id: string) {
//     return this.http.get(`${this.baseUrl}/communities/${id}`, { headers: this.authHeaders() });
//   }

//   // Communities
//   getCommunities() {
//     return this.http.get<any[]>(`${this.baseUrl}/communities`, { headers: this.authHeaders() });
//   }

//   createCommunity(data: any) {
//     return this.http.post(`${this.baseUrl}/communities`, data, { headers: this.authHeaders() });
//   }

//   updateCommunity(id: string, data: any) {
//     return this.http.put(`${this.baseUrl}/communities/${id}`, data, {
//       headers: this.authHeaders(),
//     });
//   }

//   deleteCommunity(id: string) {
//     return this.http.delete(`${this.baseUrl}/communities/${id}`, { headers: this.authHeaders() });
//   }
// }
