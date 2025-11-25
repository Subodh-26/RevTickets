import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, delay, tap, throwError, catchError, map } from 'rxjs';
import { User, AuthResponse, LoginRequest, RegisterRequest, BackendApiResponse } from '../../shared/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'revtickets_token';
  private readonly USER_KEY = 'revtickets_user';

  // Signals for reactive state
  private currentUserSignal = signal<User | null>(this.getStoredUser());
  private isLoadingSignal = signal<boolean>(false);

  // Computed signals
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());
  readonly isAdmin = computed(() => {
    const user = this.currentUserSignal();
    return user?.roles?.includes('ROLE_ADMIN') || user?.role === 'admin';
  });
  readonly isLoading = this.isLoadingSignal.asReadonly();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = this.getStoredUser();
    if (token && user) {
      this.currentUserSignal.set(user);
    }
  }

  private getStoredUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);

    return this.http.post<BackendApiResponse<AuthResponse>>(`${this.API_URL}/login`, credentials).pipe(
      map(response => response.data),
      tap(authResponse => {
        localStorage.setItem(this.TOKEN_KEY, authResponse.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
        this.currentUserSignal.set(authResponse.user);
        this.isLoadingSignal.set(false);
      }),
      catchError(error => {
        this.isLoadingSignal.set(false);
        console.error('Backend connection failed:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);

    return this.http.post<BackendApiResponse<AuthResponse>>(`${this.API_URL}/register`, data).pipe(
      map(response => response.data),
      tap(authResponse => {
        localStorage.setItem(this.TOKEN_KEY, authResponse.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
        this.currentUserSignal.set(authResponse.user);
        this.isLoadingSignal.set(false);
      }),
      catchError(error => {
        this.isLoadingSignal.set(false);
        console.error('Backend connection failed:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  updateProfile(updates: Partial<User>): Observable<User> {
    const currentUser = this.currentUserSignal();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    const updatedUser: User = {
      ...currentUser,
      ...updates,
      updatedAt: new Date()
    };

    return of(updatedUser).pipe(
      delay(500),
      tap(user => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.currentUserSignal.set(user);
      })
    );
  }

  requestPasswordReset(email: string): Observable<{ message: string }> {
    return of({ message: 'Password reset email sent successfully' }).pipe(delay(1000));
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return of({ message: 'Password reset successfully' }).pipe(delay(1000));
  }
}
