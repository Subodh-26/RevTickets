import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Review, CreateReviewRequest } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly API_URL = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  // Get reviews for a movie
  getReviewsByMovie(movieId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API_URL}/movie/${movieId}`).pipe(
      map(reviews => reviews.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )),
      catchError(error => {
        console.error('Failed to fetch reviews:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Create a new review
  createReview(request: CreateReviewRequest): Observable<Review> {
    return this.http.post<Review>(this.API_URL, request).pipe(
      catchError(error => {
        console.error('Failed to create review:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Like/unlike a review
  toggleLike(reviewId: string): Observable<Review> {
    return this.http.post<Review>(`${this.API_URL}/${reviewId}/toggle-like`, {}).pipe(
      catchError(error => {
        console.error('Failed to toggle like:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Update review
  updateReview(reviewId: string, updates: Partial<CreateReviewRequest>): Observable<Review> {
    return this.http.put<Review>(`${this.API_URL}/${reviewId}`, updates).pipe(
      catchError(error => {
        console.error('Failed to update review:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Delete review
  deleteReview(reviewId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${reviewId}`).pipe(
      catchError(error => {
        console.error('Failed to delete review:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Get user's reviews
  getUserReviews(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API_URL}/user/${userId}`).pipe(
      map(reviews => reviews.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )),
      catchError(error => {
        console.error('Failed to fetch user reviews:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }
}
