import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Booking, BookedSeat, Seat, SeatSelection } from '../../shared/models';
import { AuthService } from './auth.service';
import { ShowService } from './show.service';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_URL = `${environment.apiUrl}/bookings`;

  // Current booking state
  private currentSelectionSignal = signal<SeatSelection | null>(null);
  readonly currentSelection = this.currentSelectionSignal.asReadonly();

  private authService = inject(AuthService);
  private showService = inject(ShowService);

  constructor(private http: HttpClient) {}

  // Set selected seats for current booking
  setSelectedSeats(showId: string, seats: Seat[]): void {
    const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);
    this.currentSelectionSignal.set({
      showId,
      seats,
      totalAmount
    });
  }

  // Clear current selection
  clearSelection(): void {
    this.currentSelectionSignal.set(null);
  }

  // Calculate booking totals
  calculateTotals(baseAmount: number): { convenienceFee: number; taxes: number; total: number } {
    const convenienceFee = Math.round(baseAmount * 0.075 * 100) / 100; // 7.5%
    const taxes = Math.round((baseAmount + convenienceFee) * 0.18 * 100) / 100; // 18% GST
    const total = Math.round((baseAmount + convenienceFee + taxes) * 100) / 100;
    return { convenienceFee, taxes, total };
  }

  // Create a new booking
  createBooking(showId: string, seats: Seat[]): Observable<Booking> {
    const baseAmount = seats.reduce((sum, seat) => sum + seat.price, 0);
    const { convenienceFee, taxes, total } = this.calculateTotals(baseAmount);

    const bookedSeats: BookedSeat[] = seats.map(seat => ({
      seatId: seat.id,
      seatRow: seat.seatRow || seat.row, // Use backend field name
      seatNumber: seat.seatNumber || seat.number, // Use backend field name
      row: seat.row || seat.seatRow, // Legacy fallback
      number: seat.number || seat.seatNumber, // Legacy fallback
      category: seat.category,
      price: seat.price
    }));

    const currentUser = this.authService.currentUser();
    const userId = currentUser ? String(currentUser.id) : '1';

    const bookingData = {
      userId,
      showId,
      seats: bookedSeats,
      totalSeats: seats.length,
      baseAmount,
      convenienceFee,
      taxes,
      totalAmount: total
    };

    return this.http.post<Booking>(this.API_URL, bookingData).pipe(
      catchError(error => {
        console.error('Failed to create booking:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Get booking by ID
  getBookingById(id: string): Observable<Booking | undefined> {
    return this.http.get<Booking>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Failed to fetch booking:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Get bookings for current user
  getUserBookings(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.API_URL}/user/${userId}`).pipe(
      map(bookings => bookings.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )),
      catchError(error => {
        console.error('Failed to fetch user bookings:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Update booking status
  updateBookingStatus(id: string, status: Booking['status'], paymentId?: string): Observable<Booking> {
    const updateData = { status, paymentId };

    return this.http.put<Booking>(`${this.API_URL}/${id}/status`, updateData).pipe(
      map(updatedBooking => {
        // Mark seats as booked in the show service when booking is confirmed
        if (status === 'confirmed' && updatedBooking.showId) {
          const seatIds = updatedBooking.seats.map(s => s.seatId).filter((id): id is string | number => id !== undefined);
          this.showService.lockSeats(String(updatedBooking.showId), seatIds.map(String)).subscribe();
        }
        return updatedBooking;
      }),
      catchError(error => {
        console.error('Failed to update booking status:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }

  // Cancel booking
  cancelBooking(id: string): Observable<Booking> {
    return this.updateBookingStatus(id, 'cancelled');
  }

  // Get all bookings (admin)
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.API_URL).pipe(
      map(bookings => bookings.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )),
      catchError(error => {
        console.error('Failed to fetch all bookings:', error);
        return throwError(() => new Error('Unable to connect to backend server. Please ensure the server is running.'));
      })
    );
  }
}
