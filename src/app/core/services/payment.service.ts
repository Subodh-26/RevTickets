import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Payment, PaymentMethod, PaymentDetails } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly API_URL = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  // Process payment
  processPayment(
    bookingId: string,
    amount: number,
    method: PaymentMethod,
    details: PaymentDetails
  ): Observable<Payment> {
    const paymentData = {
      bookingId,
      amount,
      method,
      paymentDetails: details
    };

    return this.http.post<Payment>(this.API_URL, paymentData).pipe(
      catchError(error => {
        console.error('Failed to process payment:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Get payment by ID
  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Failed to fetch payment:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Get payment by booking ID
  getPaymentByBooking(bookingId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.API_URL}/booking/${bookingId}`).pipe(
      catchError(error => {
        console.error('Failed to fetch payment by booking:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Get user payment history
  getUserPayments(userId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.API_URL}/user/${userId}`).pipe(
      map(payments => payments.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )),
      catchError(error => {
        console.error('Failed to fetch user payments:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Initiate refund
  initiateRefund(paymentId: string, reason: string): Observable<Payment> {
    const refundData = { reason };

    return this.http.post<Payment>(`${this.API_URL}/${paymentId}/refund`, refundData).pipe(
      catchError(error => {
        console.error('Failed to initiate refund:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Complete refund
  completeRefund(paymentId: string): Observable<Payment> {
    return this.http.put<Payment>(`${this.API_URL}/${paymentId}/refund/complete`, {}).pipe(
      catchError(error => {
        console.error('Failed to complete refund:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Get all payments (admin)
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.API_URL).pipe(
      map(payments => payments.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )),
      catchError(error => {
        console.error('Failed to fetch all payments:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }
}
