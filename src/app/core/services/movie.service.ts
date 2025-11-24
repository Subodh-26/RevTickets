import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Movie, MovieFilters, MovieFormat } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_URL = `${environment.apiUrl}/movies`;
  private readonly ADMIN_API_URL = `${environment.apiUrl}/admin/movies`;

  constructor(private http: HttpClient) {}

  getMovies(filters?: MovieFilters): Observable<Movie[]> {
    let params = new HttpParams();
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.genres?.length) params = params.set('genres', filters.genres.join(','));
    if (filters?.languages?.length) params = params.set('languages', filters.languages.join(','));
    if (filters?.formats?.length) params = params.set('formats', filters.formats.join(','));
    if (filters?.rating) params = params.set('rating', filters.rating.toString());

    return this.http.get<{ data: Movie[] }>(this.API_URL, { params }).pipe(
      map(response => response.data || response as unknown as Movie[]),
      catchError(error => {
        console.error('Failed to fetch movies from backend:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  getNowShowing(): Observable<Movie[]> {
    return this.getMovies({ status: 'now_showing' });
  }

  getComingSoon(): Observable<Movie[]> {
    return this.getMovies({ status: 'coming_soon' });
  }

  getMovieById(id: string): Observable<Movie | undefined> {
    return this.http.get<{ data: Movie }>(`${this.API_URL}/${id}`).pipe(
      map(response => response.data || response as unknown as Movie),
      catchError(error => {
        console.error('Failed to fetch movie from backend:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  searchMovies(query: string): Observable<Movie[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<{ data: Movie[] }>(`${this.API_URL}/search`, { params }).pipe(
      map(response => response.data || response as unknown as Movie[]),
      catchError(error => {
        console.error('Failed to search movies from backend:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  getGenres(): Observable<string[]> {
    return this.http.get<{ data: string[] }>(`${this.API_URL}/genres`).pipe(
      map(response => response.data || response as unknown as string[]),
      catchError(error => {
        console.error('Failed to fetch genres from backend:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  getLanguages(): Observable<string[]> {
    return this.http.get<{ data: string[] }>(`${this.API_URL}/languages`).pipe(
      map(response => response.data || response as unknown as string[]),
      catchError(error => {
        console.error('Failed to fetch languages from backend:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Admin methods
  createMovie(movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Observable<Movie> {
    const defaultFormat: MovieFormat[] = ['2D'];
    const movieData = {
      ...movie,
      format: movie.format && movie.format.length > 0 ? movie.format : defaultFormat,
      language: movie.language || 'English',
      genres: movie.genres && movie.genres.length > 0 ? movie.genres : ['Drama'],
      cast: movie.cast && movie.cast.length > 0 ? movie.cast : [],
      rating: movie.rating || 0,
      totalRatings: movie.totalRatings || 0
    };

    return this.http.post<{ data: Movie }>(this.ADMIN_API_URL, movieData).pipe(
      map(response => response.data || response as unknown as Movie),
      catchError(error => {
        console.error('Failed to create movie in backend:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  updateMovie(id: string, updates: Partial<Movie>): Observable<Movie> {
    return this.http.put<{ data: Movie }>(`${this.ADMIN_API_URL}/${id}`, updates).pipe(
      map(response => response.data || response as unknown as Movie),
      catchError(error => {
        console.error('Failed to update movie in backend:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.ADMIN_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Failed to delete movie from backend:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }
}
