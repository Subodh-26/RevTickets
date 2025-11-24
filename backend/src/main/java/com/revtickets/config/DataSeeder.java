package com.revtickets.config;

import com.revtickets.entity.mysql.*;
import com.revtickets.repository.mysql.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final TheaterRepository theaterRepository;
    private final ScreenRepository screenRepository;
    private final ShowTimeRepository showTimeRepository;
    private final SeatRepository seatRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedRoles();
        seedAdminUser();
        seedMovies();
        seedTheaters();
        seedShowTimes();
    }

    private void seedRoles() {
        if (roleRepository.count() == 0) {
            roleRepository.save(Role.builder().name("ROLE_CUSTOMER").build());
            roleRepository.save(Role.builder().name("ROLE_ADMIN").build());
            log.info("Roles seeded successfully");
        }
    }

    private void seedAdminUser() {
        if (!userRepository.existsByEmail("admin@revtickets.com")) {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseThrow();
            Role customerRole = roleRepository.findByName("ROLE_CUSTOMER").orElseThrow();

            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(adminRole);
            adminRoles.add(customerRole);

            User admin = User.builder()
                    .fullName("Admin User")
                    .email("admin@revtickets.com")
                    .phone("9876543210")
                    .password(passwordEncoder.encode("password123"))
                    .roles(adminRoles)
                    .isActive(true)
                    .build();

            userRepository.save(admin);
            log.info("Admin user created: admin@revtickets.com / password123");
        }
    }

    private void seedMovies() {
        if (movieRepository.count() == 0) {
            List<Movie> movies = Arrays.asList(
                    Movie.builder()
                            .title("Inception")
                            .description("A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.")
                            .duration(148)
                            .genre("Action, Sci-Fi, Thriller")
                            .language("English")
                            .releaseDate(LocalDate.of(2024, 1, 15))
                            .posterUrl("https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg")
                            .trailerUrl("https://www.youtube.com/watch?v=YoHD9XEInc0")
                            .format("2D, IMAX")
                            .certification("UA")
                            .cast("Leonardo DiCaprio, Marion Cotillard, Tom Hardy")
                            .director("Christopher Nolan")
                            .rating(4.5)
                            .totalReviews(150)
                            .status(Movie.MovieStatus.NOW_SHOWING)
                            .build(),

                    Movie.builder()
                            .title("The Dark Knight")
                            .description("When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.")
                            .duration(152)
                            .genre("Action, Crime, Drama")
                            .language("English")
                            .releaseDate(LocalDate.of(2024, 2, 1))
                            .posterUrl("https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg")
                            .trailerUrl("https://www.youtube.com/watch?v=EXeTwQWrcwY")
                            .format("2D, 3D, IMAX")
                            .certification("UA")
                            .cast("Christian Bale, Heath Ledger, Aaron Eckhart")
                            .director("Christopher Nolan")
                            .rating(4.8)
                            .totalReviews(200)
                            .status(Movie.MovieStatus.NOW_SHOWING)
                            .build(),

                    Movie.builder()
                            .title("Interstellar")
                            .description("A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.")
                            .duration(169)
                            .genre("Adventure, Drama, Sci-Fi")
                            .language("English")
                            .releaseDate(LocalDate.of(2024, 3, 10))
                            .posterUrl("https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg")
                            .trailerUrl("https://www.youtube.com/watch?v=zSWdZVtXT7E")
                            .format("2D, IMAX")
                            .certification("UA")
                            .cast("Matthew McConaughey, Anne Hathaway, Jessica Chastain")
                            .director("Christopher Nolan")
                            .rating(4.7)
                            .totalReviews(180)
                            .status(Movie.MovieStatus.NOW_SHOWING)
                            .build(),

                    Movie.builder()
                            .title("Dune: Part Two")
                            .description("Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.")
                            .duration(166)
                            .genre("Action, Adventure, Sci-Fi")
                            .language("English")
                            .releaseDate(LocalDate.of(2024, 3, 1))
                            .posterUrl("https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg")
                            .trailerUrl("https://www.youtube.com/watch?v=Way9Dexny3w")
                            .format("2D, 3D, IMAX")
                            .certification("UA")
                            .cast("Timothée Chalamet, Zendaya, Rebecca Ferguson")
                            .director("Denis Villeneuve")
                            .rating(4.6)
                            .totalReviews(12340)
                            .status(Movie.MovieStatus.NOW_SHOWING)
                            .build(),

                    Movie.builder()
                            .title("Oppenheimer")
                            .description("The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.")
                            .duration(180)
                            .genre("Biography, Drama, History")
                            .language("English")
                            .releaseDate(LocalDate.of(2023, 7, 21))
                            .posterUrl("https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg")
                            .trailerUrl("https://www.youtube.com/watch?v=uYPbbksJxIg")
                            .format("2D, 3D")
                            .certification("UA")
                            .cast("Shah Rukh Khan, Deepika Padukone, John Abraham")
                            .director("Siddharth Anand")
                            .rating(4.3)
                            .totalReviews(250)
                            .status(Movie.MovieStatus.NOW_SHOWING)
                            .build()
            );

            movieRepository.saveAll(movies);
            log.info("Movies seeded successfully");
        }
    }

    private void seedTheaters() {
        if (theaterRepository.count() == 0) {
            // Create theaters
            Theater pvr = Theater.builder()
                    .name("PVR Cinemas")
                    .city("Mumbai")
                    .area("Andheri")
                    .address("Andheri West, Mumbai 400058")
                    .amenities("Dolby Atmos, Recliner Seats, Food Court")
                    .contactNumber("022-12345678")
                    .isActive(true)
                    .build();

            Theater inox = Theater.builder()
                    .name("INOX Megaplex")
                    .city("Mumbai")
                    .area("Lower Parel")
                    .address("Lower Parel, Mumbai 400013")
                    .amenities("IMAX, 4DX, MX4D")
                    .contactNumber("022-87654321")
                    .isActive(true)
                    .build();

            Theater cinepolis = Theater.builder()
                    .name("Cinepolis")
                    .city("Delhi")
                    .area("Noida")
                    .address("Sector 18, Noida 201301")
                    .amenities("VIP Seats, Junior Cinema, Screenx")
                    .contactNumber("011-11223344")
                    .isActive(true)
                    .build();

            theaterRepository.saveAll(Arrays.asList(pvr, inox, cinepolis));

            // Create screens for each theater
            createScreensForTheater(pvr);
            createScreensForTheater(inox);
            createScreensForTheater(cinepolis);

            log.info("Theaters and screens seeded successfully");
        }
    }

    private void createScreensForTheater(Theater theater) {
        List<Screen> screens = Arrays.asList(
                Screen.builder()
                        .theater(theater)
                        .name("Screen 1")
                        .totalSeats(120)
                        .screenType("Standard")
                        .soundSystem("Dolby Digital")
                        .seatLayout("A:10,B:10,C:10,D:12,E:12,F:12,G:12,H:12,I:10,J:10,K:10")
                        .isActive(true)
                        .build(),

                Screen.builder()
                        .theater(theater)
                        .name("Screen 2")
                        .totalSeats(80)
                        .screenType("Premium")
                        .soundSystem("Dolby Atmos")
                        .seatLayout("A:8,B:8,C:8,D:10,E:10,F:10,G:8,H:8,I:10")
                        .isActive(true)
                        .build(),

                Screen.builder()
                        .theater(theater)
                        .name("Screen 3 - IMAX")
                        .totalSeats(200)
                        .screenType("IMAX")
                        .soundSystem("IMAX Enhanced")
                        .seatLayout("A:12,B:12,C:14,D:14,E:14,F:16,G:16,H:16,I:16,J:16,K:14,L:14,M:12,N:12")
                        .isActive(true)
                        .build()
        );

        screenRepository.saveAll(screens);
    }

    private void seedShowTimes() {
        if (showTimeRepository.count() == 0) {
            List<Movie> movies = movieRepository.findNowShowing();
            List<Screen> screens = screenRepository.findAll();

            if (movies.isEmpty() || screens.isEmpty()) {
                return;
            }

            LocalDate today = LocalDate.now();
            LocalTime[] showTimes = {
                    LocalTime.of(9, 30),
                    LocalTime.of(12, 30),
                    LocalTime.of(15, 30),
                    LocalTime.of(18, 30),
                    LocalTime.of(21, 30)
            };

            // Create shows for next 7 days
            for (int day = 0; day < 7; day++) {
                LocalDate showDate = today.plusDays(day);

                for (Screen screen : screens) {
                    Movie movie = movies.get(new Random().nextInt(movies.size()));

                    for (LocalTime startTime : showTimes) {
                        LocalTime endTime = startTime.plusMinutes(movie.getDuration() + 15);
                        BigDecimal basePrice = new BigDecimal("200.00");

                        ShowTime showTime = ShowTime.builder()
                                .movie(movie)
                                .screen(screen)
                                .showDate(showDate)
                                .startTime(startTime)
                                .endTime(endTime)
                                .basePrice(basePrice)
                                .format(movie.getFormat().split(",")[0].trim())
                                .language(movie.getLanguage())
                                .availableSeats(screen.getTotalSeats())
                                .status(ShowTime.ShowStatus.SCHEDULED)
                                .build();

                        showTime = showTimeRepository.save(showTime);

                        // Generate seats for this showtime
                        generateSeatsForShowTime(showTime, screen, basePrice);
                    }
                }
            }

            log.info("Showtimes seeded successfully");
        }
    }

    private void generateSeatsForShowTime(ShowTime showTime, Screen screen, BigDecimal basePrice) {
        List<Seat> seats = new ArrayList<>();
        String[] rows = screen.getSeatLayout().split(",");

        for (String rowConfig : rows) {
            String[] parts = rowConfig.split(":");
            String rowLetter = parts[0].trim();
            int seatsInRow = Integer.parseInt(parts[1].trim());

            Seat.SeatCategory category = determineSeatCategory(rowLetter);
            BigDecimal seatPrice = calculateSeatPrice(basePrice, category);

            for (int i = 1; i <= seatsInRow; i++) {
                Seat seat = Seat.builder()
                        .showTime(showTime)
                        .seatRow(rowLetter)
                        .seatNumber(i)
                        .category(category)
                        .price(seatPrice)
                        .status(Seat.SeatStatus.AVAILABLE)
                        .build();
                seats.add(seat);
            }
        }

        seatRepository.saveAll(seats);
    }

    private Seat.SeatCategory determineSeatCategory(String row) {
        char rowChar = row.charAt(0);
        if (rowChar <= 'C') {
            return Seat.SeatCategory.SILVER;
        } else if (rowChar <= 'G') {
            return Seat.SeatCategory.GOLD;
        } else if (rowChar <= 'J') {
            return Seat.SeatCategory.PLATINUM;
        } else {
            return Seat.SeatCategory.RECLINER;
        }
    }

    private BigDecimal calculateSeatPrice(BigDecimal basePrice, Seat.SeatCategory category) {
        return switch (category) {
            case SILVER -> basePrice;
            case GOLD -> basePrice.multiply(BigDecimal.valueOf(1.3));
            case PLATINUM -> basePrice.multiply(BigDecimal.valueOf(1.6));
            case RECLINER -> basePrice.multiply(BigDecimal.valueOf(2.0));
        };
    }
}
