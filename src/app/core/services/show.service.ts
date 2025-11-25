import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Show, Theater, Seat, ShowFilters } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private readonly API_URL = `${environment.apiUrl}/showtimes`;
  private readonly THEATERS_API_URL = `${environment.apiUrl}/theaters`;

  constructor(private http: HttpClient) {}

  getShowsByMovie(movieId: string, filters?: ShowFilters): Observable<Show[]> {
    let params = new HttpParams();
    params = params.set('movieId', movieId);

    if (filters?.date) {
      params = params.set('date', filters.date.toISOString().split('T')[0]);
    }

    if (filters?.format) {
      params = params.set('format', filters.format);
    }

    return this.http.get<Show[]>(this.API_URL, { params }).pipe(
      catchError(error => {
        console.error('Failed to fetch shows by movie:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  getShowById(showId: string): Observable<Show> {
    return this.http.get<Show>(`${this.API_URL}/${showId}`).pipe(
      catchError(error => {
        console.error('Failed to fetch show:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  getSeatsForShow(showId: string): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.API_URL}/${showId}/seats`).pipe(
      catchError(error => {
        console.error('Failed to fetch seats for show:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  getTheaters(): Observable<Theater[]> {
    return this.http.get<Theater[]>(this.THEATERS_API_URL).pipe(
      catchError(error => {
        console.error('Failed to fetch theaters:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  getTheaterById(id: string): Observable<Theater> {
    return this.http.get<Theater>(`${this.THEATERS_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Failed to fetch theater:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Admin methods
  createShow(show: Omit<Show, 'id' | 'createdAt' | 'updatedAt'>): Observable<Show> {
    return this.http.post<Show>(this.API_URL, show).pipe(
      catchError(error => {
        console.error('Failed to create show:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  updateShow(id: string, updates: Partial<Show>): Observable<Show> {
    return this.http.put<Show>(`${this.API_URL}/${id}`, updates).pipe(
      catchError(error => {
        console.error('Failed to update show:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  deleteShow(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Failed to delete show:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Mark seats as booked for a show
  lockSeats(showId: string, seatIds: string[]): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/${showId}/lock-seats`, { seatIds }).pipe(
      catchError(error => {
        console.error('Failed to lock seats:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  createTheater(theater: Omit<Theater, 'id' | 'createdAt' | 'updatedAt'>): Observable<Theater> {
    return this.http.post<Theater>(this.THEATERS_API_URL, theater).pipe(
      catchError(error => {
        console.error('Failed to create theater:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }
}
