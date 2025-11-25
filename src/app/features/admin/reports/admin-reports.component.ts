import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { MovieService } from '../../../core/services/movie.service';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-reports">
      <div class="container">
        <div class="page-header">
          <h1>Reports & Analytics</h1>
          <button class="btn-export" (click)="exportCSV()">
            <span class="material-icons">download</span>
            Export CSV
          </button>
        </div>

        <!-- Summary Cards -->
        <div class="summary-grid">
          <div class="summary-card">
            <span class="label">Total Revenue</span>
            <span class="value">₹{{ totalRevenue().toLocaleString() }}</span>
            <span class="change positive">+12.5% from last month</span>
          </div>
          <div class="summary-card">
            <span class="label">Total Bookings</span>
            <span class="value">{{ totalBookings() }}</span>
            <span class="change positive">+8.2% from last month</span>
          </div>
          <div class="summary-card">
            <span class="label">Avg. Ticket Price</span>
            <span class="value">₹{{ avgTicketPrice().toFixed(2) }}</span>
            <span class="change negative">-2.1% from last month</span>
          </div>
          <div class="summary-card">
            <span class="label">Active Movies</span>
            <span class="value">{{ activeMovies() }}</span>
            <span class="change neutral">No change</span>
          </div>
        </div>

        <!-- Charts Placeholder -->
        <div class="charts-section">
          <div class="chart-card">
            <h3>Revenue Trend</h3>
            <div class="chart-placeholder">
              <div class="bar-chart">
                @for (bar of revenueBars; track bar.label) {
                  <div class="bar-item">
                    <div class="bar" [style.height.%]="bar.value"></div>
                    <span class="bar-label">{{ bar.label }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <div class="chart-card">
            <h3>Top Movies by Revenue</h3>
            <div class="movie-stats">
              @for (movie of topMovies(); track movie.title) {
                <div class="movie-stat-item">
                  <div class="movie-info">
                    <span class="title">{{ movie.title }}</span>
                    <span class="bookings">{{ movie.bookings }} bookings</span>
                  </div>
                  <div class="revenue">₹{{ movie.revenue.toLocaleString() }}</div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="data-section">
          <h3>Booking Details</h3>
          <div class="data-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bookings</th>
                  <th>Revenue</th>
                  <th>Avg. Price</th>
                </tr>
              </thead>
              <tbody>
                @for (row of tableData(); track row.date) {
                  <tr>
                    <td>{{ row.date }}</td>
                    <td>{{ row.bookings }}</td>
                    <td>₹{{ row.revenue.toLocaleString() }}</td>
                    <td>₹{{ row.avgPrice.toFixed(2) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @use '../../../../styles/variables' as *;
    @use '../../../../styles/mixins' as *;

    .admin-reports {
      padding: $spacing-2xl 0;
      min-height: calc(100vh - $header-height);
    }

    .page-header {
      @include flex-between;
      margin-bottom: $spacing-2xl;

      h1 {
        font-size: $font-size-2xl;
      }

      .btn-export {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
        padding: $spacing-sm $spacing-lg;
        background: $background-light;
        border: none;
        border-radius: $radius-md;
        color: $text-primary;
        cursor: pointer;

        &:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .material-icons {
          font-size: 20px;
        }
      }
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-md;
      margin-bottom: $spacing-2xl;

      @include md {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .summary-card {
      background: $background-medium;
      border-radius: $radius-lg;
      padding: $spacing-lg;
      display: flex;
      flex-direction: column;
      gap: $spacing-xs;

      .label {
        font-size: $font-size-sm;
        color: $text-muted;
      }

      .value {
        font-size: $font-size-xl;
        font-weight: $font-weight-bold;
      }

      .change {
        font-size: $font-size-xs;

        &.positive {
          color: $success;
        }

        &.negative {
          color: $error;
        }

        &.neutral {
          color: $text-muted;
        }
      }
    }

    .charts-section {
      display: grid;
      grid-template-columns: 1fr;
      gap: $spacing-xl;
      margin-bottom: $spacing-2xl;

      @include lg {
        grid-template-columns: 2fr 1fr;
      }
    }

    .chart-card {
      background: $background-medium;
      border-radius: $radius-lg;
      padding: $spacing-xl;

      h3 {
        font-size: $font-size-base;
        margin-bottom: $spacing-lg;
      }
    }

    .chart-placeholder {
      height: 200px;
    }

    .bar-chart {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      height: 100%;
      padding-top: $spacing-lg;

      .bar-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        gap: $spacing-sm;

        .bar {
          width: 60%;
          background: $primary;
          border-radius: $radius-sm $radius-sm 0 0;
          min-height: 10px;
        }

        .bar-label {
          font-size: $font-size-xs;
          color: $text-muted;
        }
      }
    }

    .movie-stats {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
    }

    .movie-stat-item {
      @include flex-between;
      padding: $spacing-md;
      background: $background-light;
      border-radius: $radius-md;

      .movie-info {
        display: flex;
        flex-direction: column;
        gap: $spacing-xs;

        .title {
          font-weight: $font-weight-medium;
        }

        .bookings {
          font-size: $font-size-xs;
          color: $text-muted;
        }
      }

      .revenue {
        font-weight: $font-weight-bold;
        color: $success;
      }
    }

    .data-section {
      h3 {
        font-size: $font-size-lg;
        margin-bottom: $spacing-lg;
      }
    }

    .data-table {
      background: $background-medium;
      border-radius: $radius-lg;
      overflow: hidden;

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: $spacing-md;
          text-align: left;
        }

        th {
          background: $background-light;
          font-size: $font-size-sm;
          font-weight: $font-weight-semibold;
          color: $text-muted;
        }

        td {
          font-size: $font-size-sm;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
      }
    }
  `]
})
export class AdminReportsComponent implements OnInit {
  totalRevenue = signal(0);
  totalBookings = signal(0);
  avgTicketPrice = signal(0);
  activeMovies = signal(0);

  topMovies = signal<{ title: string; bookings: number; revenue: number }[]>([]);
  tableData = signal<{ date: string; bookings: number; revenue: number; avgPrice: number }[]>([]);

  revenueBars = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 45 },
    { label: 'Wed', value: 55 },
    { label: 'Thu', value: 70 },
    { label: 'Fri', value: 85 },
    { label: 'Sat', value: 95 },
    { label: 'Sun', value: 80 }
  ];

  constructor(
    private bookingService: BookingService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  private loadReportData(): void {
    this.bookingService.getAllBookings().subscribe(bookings => {
      const confirmed = bookings.filter(b => b.status === 'confirmed');
      const revenue = confirmed.reduce((sum, b) => sum + b.totalAmount, 0);

      this.totalBookings.set(confirmed.length);
      this.totalRevenue.set(revenue);
      this.avgTicketPrice.set(confirmed.length ? revenue / confirmed.length : 0);

      // Calculate real table data from bookings grouped by date
      const bookingsByDate = new Map<string, { count: number; revenue: number }>();
      confirmed.forEach(booking => {
        const dateKey = new Date(booking.createdAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        });
        const existing = bookingsByDate.get(dateKey) || { count: 0, revenue: 0 };
        bookingsByDate.set(dateKey, {
          count: existing.count + 1,
          revenue: existing.revenue + booking.totalAmount
        });
      });

      const tableData = Array.from(bookingsByDate.entries())
        .map(([date, data]) => ({
          date,
          bookings: data.count,
          revenue: data.revenue,
          avgPrice: data.count ? data.revenue / data.count : 0
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10); // Top 10 days

      this.tableData.set(tableData);

      // Calculate real top movies from bookings
      const movieStats = new Map<string, { bookings: number; revenue: number }>();
      confirmed.forEach(booking => {
        if (booking.showId) {
          const movieKey = String(booking.showId); // Convert to string for Map key
          const existing = movieStats.get(movieKey) || { bookings: 0, revenue: 0 };
          movieStats.set(movieKey, {
            bookings: existing.bookings + 1,
            revenue: existing.revenue + booking.totalAmount
          });
        }
      });

      const topMoviesData = Array.from(movieStats.entries())
        .map(([showId, data]) => ({
          title: `Show ${showId}`, // Replace with actual movie title from show/movie data
          bookings: data.bookings,
          revenue: data.revenue
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5); // Top 5 movies

      this.topMovies.set(topMoviesData);
    });

    this.movieService.getMovies({ status: 'now_showing' }).subscribe(movies => {
      this.activeMovies.set(movies.length);
    });
  }

  exportCSV(): void {
    // Generate CSV
    const headers = ['Date', 'Bookings', 'Revenue', 'Avg Price'];
    const rows = this.tableData().map(row =>
      [row.date, row.bookings, row.revenue, row.avgPrice.toFixed(2)]
    );

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'revtickets-report.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
