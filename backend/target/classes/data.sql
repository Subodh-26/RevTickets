-- RevTickets Mock Data
-- This script populates the database with sample data

-- Clear existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM shows;
-- DELETE FROM screens;
-- DELETE FROM theaters;
-- DELETE FROM movies;
-- DELETE FROM users;

-- =============================================
-- USERS (password is 'password123' for all users)
-- BCrypt hash for 'password123'
-- =============================================
INSERT INTO users (email, password, full_name, phone, created_at, updated_at) VALUES
('admin@revtickets.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGxMwBaF/lA6p8C5qG.rLCBfu', 'Admin User', '9876543210', NOW(), NOW()),
('john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGxMwBaF/lA6p8C5qG.rLCBfu', 'John Doe', '9876543211', NOW(), NOW()),
('jane@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGxMwBaF/lA6p8C5qG.rLCBfu', 'Jane Smith', '9876543212', NOW(), NOW()),
('mike@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGxMwBaF/lA6p8C5qG.rLCBfu', 'Mike Johnson', '9876543213', NOW(), NOW())
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Add admin role
INSERT INTO user_roles (user_id, role)
SELECT id, 'ROLE_ADMIN' FROM users WHERE email = 'admin@revtickets.com'
ON DUPLICATE KEY UPDATE role = VALUES(role);

-- Add user roles
INSERT INTO user_roles (user_id, role)
SELECT id, 'ROLE_USER' FROM users WHERE email IN ('john@example.com', 'jane@example.com', 'mike@example.com')
ON DUPLICATE KEY UPDATE role = VALUES(role);

-- =============================================
-- MOVIES (matching frontend mock data)
-- =============================================
INSERT INTO movies (id, title, description, duration, rating, certificate, release_date, poster_url, banner_url, trailer_url, status, language, director, total_ratings, created_at, updated_at) VALUES
(1, 'Inception', 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 148, 4.8, 'UA', '2010-07-16', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BMTQ2NjMwMTE1NF5BMl5BanBnXkFtZTcwMTMxNjEyMw@@._V1_FMjpg_UX1920_.jpg', 'https://www.youtube.com/embed/YoHD9XEInc0', 'NOW_SHOWING', 'English', 'Christopher Nolan', 15420, NOW(), NOW()),

(2, 'The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 152, 4.9, 'UA', '2008-07-18', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1920_.jpg', 'https://www.youtube.com/embed/EXeTwQWrcwY', 'NOW_SHOWING', 'English', 'Christopher Nolan', 23890, NOW(), NOW()),

(3, 'Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 169, 4.7, 'UA', '2014-11-07', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1920_.jpg', 'https://www.youtube.com/embed/zSWdZVtXT7E', 'NOW_SHOWING', 'English', 'Christopher Nolan', 18750, NOW(), NOW()),

(4, 'Dune: Part Two', 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', 166, 4.6, 'UA', '2024-03-01', 'https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1920_.jpg', 'https://www.youtube.com/embed/Way9Dexny3w', 'NOW_SHOWING', 'English', 'Denis Villeneuve', 12340, NOW(), NOW()),

(5, 'Oppenheimer', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 180, 4.8, 'A', '2023-07-21', 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg', 'https://www.youtube.com/embed/uYPbbksJxIg', 'NOW_SHOWING', 'English', 'Christopher Nolan', 19200, NOW(), NOW()),

(6, 'The Matrix', 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.', 136, 4.7, 'A', '1999-03-31', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', 'https://www.youtube.com/embed/vKQi3bBA1y8', 'NOW_SHOWING', 'English', 'The Wachowskis', 21500, NOW(), NOW()),

(7, 'Gladiator', 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', 155, 4.6, 'A', '2000-05-05', 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', 'https://www.youtube.com/embed/owK1qxDselE', 'NOW_SHOWING', 'English', 'Ridley Scott', 16800, NOW(), NOW()),

(8, 'Avatar: The Way of Water', 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na''vi race to protect their home.', 192, 4.5, 'UA', '2022-12-16', 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg', 'https://www.youtube.com/embed/d9MyW72ELq0', 'NOW_SHOWING', 'English', 'James Cameron', 14200, NOW(), NOW()),

(9, 'Spider-Man: No Way Home', 'With Spider-Man''s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.', 148, 4.7, 'UA', '2021-12-17', 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg', 'https://www.youtube.com/embed/JfVOs4VSpmA', 'NOW_SHOWING', 'English', 'Jon Watts', 22100, NOW(), NOW()),

(10, 'Top Gun: Maverick', 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN''s elite graduates on a mission that demands the ultimate sacrifice.', 130, 4.8, 'UA', '2022-05-27', 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg', 'https://www.youtube.com/embed/giXco2jaZ_4', 'NOW_SHOWING', 'English', 'Joseph Kosinski', 18900, NOW(), NOW()),

(11, 'Avatar 3', 'The third installment in the Avatar franchise continues the story of Jake Sully and Neytiri.', 180, 0.0, 'UA', '2025-12-19', 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg', '', 'COMING_SOON', 'English', 'James Cameron', 0, NOW(), NOW()),

(12, 'Mission: Impossible 8', 'Ethan Hunt and his IMF team embark on their most dangerous mission yet.', 165, 0.0, 'UA', '2025-05-23', 'https://m.media-amazon.com/images/M/MV5BYzFiZjc1YzctMDY3Zi00NGE5LTlmNWEtN2Q3OWFjYjY1NGM2XkEyXkFqcGdeQXVyMTUyMTUzNjQ0._V1_.jpg', 'https://m.media-amazon.com/images/M/MV5BYzFiZjc1YzctMDY3Zi00NGE5LTlmNWEtN2Q3OWFjYjY1NGM2XkEyXkFqcGdeQXVyMTUyMTUzNjQ0._V1_.jpg', '', 'COMING_SOON', 'English', 'Christopher McQuarrie', 0, NOW(), NOW()),

(13, 'Deadpool & Wolverine', 'Deadpool teams up with Wolverine in an adventure across the multiverse.', 150, 0.0, 'A', '2024-07-26', 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', '', 'COMING_SOON', 'English', 'Shawn Levy', 0, NOW(), NOW()),

(14, 'Joker: Folie a Deux', 'Arthur Fleck is institutionalized at Arkham awaiting trial for his crimes as Joker. While struggling with his dual identity, Arthur falls in love with Harley Quinn.', 138, 0.0, 'A', '2024-10-04', 'https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg', 'https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg', '', 'COMING_SOON', 'English', 'Todd Phillips', 0, NOW(), NOW())
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Add genres for movies
INSERT INTO movie_genres (movie_id, genre) VALUES
(1, 'Action'), (1, 'Sci-Fi'), (1, 'Thriller'),
(2, 'Action'), (2, 'Crime'), (2, 'Drama'),
(3, 'Adventure'), (3, 'Drama'), (3, 'Sci-Fi'),
(4, 'Action'), (4, 'Adventure'), (4, 'Sci-Fi'),
(5, 'Biography'), (5, 'Drama'), (5, 'History'),
(6, 'Action'), (6, 'Sci-Fi'),
(7, 'Action'), (7, 'Adventure'), (7, 'Drama'),
(8, 'Action'), (8, 'Adventure'), (8, 'Fantasy'),
(9, 'Action'), (9, 'Adventure'), (9, 'Fantasy'),
(10, 'Action'), (10, 'Drama'),
(11, 'Action'), (11, 'Adventure'), (11, 'Fantasy'),
(12, 'Action'), (12, 'Adventure'), (12, 'Thriller'),
(13, 'Action'), (13, 'Comedy'), (13, 'Sci-Fi'),
(14, 'Crime'), (14, 'Drama'), (14, 'Musical')
ON DUPLICATE KEY UPDATE genre = VALUES(genre);

-- Add formats for movies
INSERT INTO movie_formats (movie_id, format) VALUES
(1, '2D'), (1, 'IMAX'),
(2, '2D'), (2, 'IMAX'), (2, '4DX'),
(3, '2D'), (3, 'IMAX'), (3, 'DOLBY'),
(4, '2D'), (4, '3D'), (4, 'IMAX'), (4, '4DX'),
(5, '2D'), (5, 'IMAX'), (5, 'DOLBY'),
(6, '2D'), (6, '4DX'),
(7, '2D'), (7, 'IMAX'),
(8, '3D'), (8, 'IMAX'), (8, '4DX'), (8, 'DOLBY'),
(9, '2D'), (9, '3D'), (9, 'IMAX'), (9, '4DX'),
(10, '2D'), (10, 'IMAX'), (10, '4DX'), (10, 'DOLBY'),
(11, '3D'), (11, 'IMAX'), (11, '4DX'), (11, 'DOLBY'),
(12, '2D'), (12, 'IMAX'), (12, '4DX'),
(13, '2D'), (13, 'IMAX'), (13, '4DX'),
(14, '2D'), (14, 'IMAX')
ON DUPLICATE KEY UPDATE format = VALUES(format);

-- Add cast for movies
INSERT INTO movie_cast (movie_id, cast_member) VALUES
(1, 'Leonardo DiCaprio'), (1, 'Tom Hardy'), (1, 'Joseph Gordon-Levitt'),
(2, 'Christian Bale'), (2, 'Heath Ledger'), (2, 'Aaron Eckhart'),
(3, 'Matthew McConaughey'), (3, 'Anne Hathaway'), (3, 'Jessica Chastain'),
(4, 'Timothee Chalamet'), (4, 'Zendaya'), (4, 'Rebecca Ferguson'),
(5, 'Cillian Murphy'), (5, 'Emily Blunt'), (5, 'Robert Downey Jr.'),
(6, 'Keanu Reeves'), (6, 'Laurence Fishburne'), (6, 'Carrie-Anne Moss'),
(7, 'Russell Crowe'), (7, 'Joaquin Phoenix'), (7, 'Connie Nielsen'),
(8, 'Sam Worthington'), (8, 'Zoe Saldana'), (8, 'Sigourney Weaver'),
(9, 'Tom Holland'), (9, 'Zendaya'), (9, 'Benedict Cumberbatch'),
(10, 'Tom Cruise'), (10, 'Miles Teller'), (10, 'Jennifer Connelly'),
(11, 'Sam Worthington'), (11, 'Zoe Saldana'),
(12, 'Tom Cruise'), (12, 'Hayley Atwell'),
(13, 'Ryan Reynolds'), (13, 'Hugh Jackman'),
(14, 'Joaquin Phoenix'), (14, 'Lady Gaga')
ON DUPLICATE KEY UPDATE cast_member = VALUES(cast_member);

-- =============================================
-- THEATERS
-- =============================================
INSERT INTO theaters (id, name, address, city, state, pincode, phone, email, total_screens, facilities, created_at, updated_at) VALUES
(1, 'PVR Cinemas - Phoenix Mall', 'Phoenix Marketcity, LBS Marg, Kurla West', 'Mumbai', 'Maharashtra', '400070', '022-12345678', 'phoenix@pvr.com', 6, 'Parking,Food Court,Wheelchair Access,Dolby Atmos', NOW(), NOW()),
(2, 'INOX - R City Mall', 'R City Mall, LBS Marg, Ghatkopar West', 'Mumbai', 'Maharashtra', '400086', '022-87654321', 'rcity@inox.com', 5, 'Parking,Food Court,IMAX,4DX', NOW(), NOW()),
(3, 'Cinepolis - Andheri', 'Fun Republic Mall, Off New Link Road, Andheri West', 'Mumbai', 'Maharashtra', '400053', '022-11223344', 'andheri@cinepolis.com', 4, 'Parking,Food Court,Dolby Atmos,Recliner Seats', NOW(), NOW()),
(4, 'PVR Cinemas - Infinity Mall', 'Infinity Mall, Link Road, Malad West', 'Mumbai', 'Maharashtra', '400064', '022-55667788', 'infinity@pvr.com', 5, 'Parking,Food Court,IMAX,Premium Lounge', NOW(), NOW()),
(5, 'INOX - Nariman Point', 'NCPA Marg, Nariman Point', 'Mumbai', 'Maharashtra', '400021', '022-99887766', 'nariman@inox.com', 3, 'Valet Parking,Gourmet Food,Luxury Seating', NOW(), NOW())
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- =============================================
-- SCREENS
-- =============================================
INSERT INTO screens (id, theater_id, name, screen_type, total_seats, rows_count, columns_count, created_at, updated_at) VALUES
-- PVR Phoenix Mall Screens
(1, 1, 'Audi 1', 'IMAX', 280, 14, 20, NOW(), NOW()),
(2, 1, 'Audi 2', 'Dolby Atmos', 200, 10, 20, NOW(), NOW()),
(3, 1, 'Audi 3', 'Standard', 180, 9, 20, NOW(), NOW()),
(4, 1, 'Audi 4', 'Standard', 180, 9, 20, NOW(), NOW()),
(5, 1, 'Audi 5', '4DX', 120, 8, 15, NOW(), NOW()),
(6, 1, 'Audi 6', 'Gold Class', 50, 5, 10, NOW(), NOW()),

-- INOX R City Screens
(7, 2, 'Screen 1', 'IMAX', 300, 15, 20, NOW(), NOW()),
(8, 2, 'Screen 2', '4DX', 100, 10, 10, NOW(), NOW()),
(9, 2, 'Screen 3', 'Standard', 200, 10, 20, NOW(), NOW()),
(10, 2, 'Screen 4', 'Standard', 180, 9, 20, NOW(), NOW()),
(11, 2, 'Screen 5', 'Dolby Atmos', 220, 11, 20, NOW(), NOW()),

-- Cinepolis Andheri Screens
(12, 3, 'Hall A', 'Dolby Atmos', 250, 10, 25, NOW(), NOW()),
(13, 3, 'Hall B', 'Standard', 200, 10, 20, NOW(), NOW()),
(14, 3, 'Hall C', 'Recliner', 80, 8, 10, NOW(), NOW()),
(15, 3, 'Hall D', 'Standard', 180, 9, 20, NOW(), NOW()),

-- PVR Infinity Mall Screens
(16, 4, 'Audi 1', 'IMAX', 320, 16, 20, NOW(), NOW()),
(17, 4, 'Audi 2', 'Standard', 200, 10, 20, NOW(), NOW()),
(18, 4, 'Audi 3', 'Premium', 100, 10, 10, NOW(), NOW()),
(19, 4, 'Audi 4', 'Standard', 180, 9, 20, NOW(), NOW()),
(20, 4, 'Audi 5', 'Dolby Atmos', 220, 11, 20, NOW(), NOW()),

-- INOX Nariman Point Screens
(21, 5, 'Insignia 1', 'Luxury', 60, 6, 10, NOW(), NOW()),
(22, 5, 'Insignia 2', 'Luxury', 60, 6, 10, NOW(), NOW()),
(23, 5, 'Insignia 3', 'Premium', 80, 8, 10, NOW(), NOW())
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- =============================================
-- SHOWS (for next 7 days)
-- =============================================
-- Generate shows for multiple movies across theaters

-- Dune: Part Two shows
INSERT INTO shows (movie_id, theater_id, screen_id, show_date, show_time, price, available_seats, status, created_at, updated_at) VALUES
(1, 1, 1, CURDATE(), '10:00:00', 450.00, 280, 'available', NOW(), NOW()),
(1, 1, 1, CURDATE(), '14:00:00', 450.00, 280, 'available', NOW(), NOW()),
(1, 1, 1, CURDATE(), '18:00:00', 500.00, 280, 'available', NOW(), NOW()),
(1, 1, 1, CURDATE(), '21:30:00', 500.00, 280, 'available', NOW(), NOW()),
(1, 2, 7, CURDATE(), '11:00:00', 480.00, 300, 'available', NOW(), NOW()),
(1, 2, 7, CURDATE(), '15:00:00', 480.00, 300, 'available', NOW(), NOW()),
(1, 2, 7, CURDATE(), '19:00:00', 520.00, 300, 'available', NOW(), NOW()),
(1, 1, 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:00:00', 450.00, 280, 'available', NOW(), NOW()),
(1, 1, 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '14:00:00', 450.00, 280, 'available', NOW(), NOW()),
(1, 1, 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '18:00:00', 500.00, 280, 'available', NOW(), NOW()),
(1, 2, 7, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '11:00:00', 480.00, 300, 'available', NOW(), NOW()),
(1, 2, 7, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '19:00:00', 520.00, 300, 'available', NOW(), NOW()),

-- Oppenheimer shows
(2, 1, 2, CURDATE(), '09:30:00', 350.00, 200, 'available', NOW(), NOW()),
(2, 1, 2, CURDATE(), '13:30:00', 350.00, 200, 'available', NOW(), NOW()),
(2, 1, 2, CURDATE(), '17:30:00', 400.00, 200, 'available', NOW(), NOW()),
(2, 1, 2, CURDATE(), '21:00:00', 400.00, 200, 'available', NOW(), NOW()),
(2, 3, 12, CURDATE(), '10:30:00', 380.00, 250, 'available', NOW(), NOW()),
(2, 3, 12, CURDATE(), '14:30:00', 380.00, 250, 'available', NOW(), NOW()),
(2, 3, 12, CURDATE(), '18:30:00', 420.00, 250, 'available', NOW(), NOW()),
(2, 1, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '13:30:00', 350.00, 200, 'available', NOW(), NOW()),
(2, 1, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '17:30:00', 400.00, 200, 'available', NOW(), NOW()),
(2, 3, 12, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:30:00', 380.00, 250, 'available', NOW(), NOW()),

-- Inception shows
(3, 1, 3, CURDATE(), '10:00:00', 300.00, 180, 'available', NOW(), NOW()),
(3, 1, 3, CURDATE(), '14:00:00', 300.00, 180, 'available', NOW(), NOW()),
(3, 1, 3, CURDATE(), '18:00:00', 350.00, 180, 'available', NOW(), NOW()),
(3, 1, 3, CURDATE(), '21:30:00', 350.00, 180, 'available', NOW(), NOW()),
(3, 4, 17, CURDATE(), '11:00:00', 320.00, 200, 'available', NOW(), NOW()),
(3, 4, 17, CURDATE(), '15:00:00', 320.00, 200, 'available', NOW(), NOW()),
(3, 4, 17, CURDATE(), '19:00:00', 380.00, 200, 'available', NOW(), NOW()),
(3, 1, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '14:00:00', 300.00, 180, 'available', NOW(), NOW()),
(3, 1, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '18:00:00', 350.00, 180, 'available', NOW(), NOW()),

-- The Dark Knight shows
(4, 2, 9, CURDATE(), '10:30:00', 280.00, 200, 'available', NOW(), NOW()),
(4, 2, 9, CURDATE(), '14:30:00', 280.00, 200, 'available', NOW(), NOW()),
(4, 2, 9, CURDATE(), '18:30:00', 320.00, 200, 'available', NOW(), NOW()),
(4, 2, 9, CURDATE(), '22:00:00', 320.00, 200, 'available', NOW(), NOW()),
(4, 5, 21, CURDATE(), '12:00:00', 600.00, 60, 'available', NOW(), NOW()),
(4, 5, 21, CURDATE(), '16:00:00', 600.00, 60, 'available', NOW(), NOW()),
(4, 5, 21, CURDATE(), '20:00:00', 700.00, 60, 'available', NOW(), NOW()),

-- Interstellar shows
(5, 1, 4, CURDATE(), '09:00:00', 320.00, 180, 'available', NOW(), NOW()),
(5, 1, 4, CURDATE(), '13:00:00', 320.00, 180, 'available', NOW(), NOW()),
(5, 1, 4, CURDATE(), '17:00:00', 380.00, 180, 'available', NOW(), NOW()),
(5, 1, 4, CURDATE(), '21:00:00', 380.00, 180, 'available', NOW(), NOW()),
(5, 3, 13, CURDATE(), '10:00:00', 300.00, 200, 'available', NOW(), NOW()),
(5, 3, 13, CURDATE(), '14:00:00', 300.00, 200, 'available', NOW(), NOW()),
(5, 3, 13, CURDATE(), '18:00:00', 350.00, 200, 'available', NOW(), NOW()),

-- Avatar: The Way of Water shows
(6, 2, 7, CURDATE(), '09:00:00', 500.00, 300, 'available', NOW(), NOW()),
(6, 2, 7, CURDATE(), '13:00:00', 500.00, 300, 'available', NOW(), NOW()),
(6, 4, 16, CURDATE(), '10:00:00', 520.00, 320, 'available', NOW(), NOW()),
(6, 4, 16, CURDATE(), '14:00:00', 520.00, 320, 'available', NOW(), NOW()),
(6, 4, 16, CURDATE(), '18:00:00', 580.00, 320, 'available', NOW(), NOW()),
(6, 4, 16, CURDATE(), '22:00:00', 580.00, 320, 'available', NOW(), NOW()),

-- Spider-Man: No Way Home shows
(7, 1, 5, CURDATE(), '11:00:00', 400.00, 120, 'available', NOW(), NOW()),
(7, 1, 5, CURDATE(), '15:00:00', 400.00, 120, 'available', NOW(), NOW()),
(7, 1, 5, CURDATE(), '19:00:00', 450.00, 120, 'available', NOW(), NOW()),
(7, 2, 8, CURDATE(), '12:00:00', 420.00, 100, 'available', NOW(), NOW()),
(7, 2, 8, CURDATE(), '16:00:00', 420.00, 100, 'available', NOW(), NOW()),
(7, 2, 8, CURDATE(), '20:00:00', 480.00, 100, 'available', NOW(), NOW()),

-- Top Gun: Maverick shows
(8, 3, 14, CURDATE(), '10:00:00', 500.00, 80, 'available', NOW(), NOW()),
(8, 3, 14, CURDATE(), '14:00:00', 500.00, 80, 'available', NOW(), NOW()),
(8, 3, 14, CURDATE(), '18:00:00', 550.00, 80, 'available', NOW(), NOW()),
(8, 3, 14, CURDATE(), '22:00:00', 550.00, 80, 'available', NOW(), NOW()),
(8, 4, 18, CURDATE(), '11:00:00', 480.00, 100, 'available', NOW(), NOW()),
(8, 4, 18, CURDATE(), '15:00:00', 480.00, 100, 'available', NOW(), NOW()),
(8, 4, 18, CURDATE(), '19:00:00', 520.00, 100, 'available', NOW(), NOW()),

-- The Batman shows
(9, 2, 11, CURDATE(), '10:00:00', 380.00, 220, 'available', NOW(), NOW()),
(9, 2, 11, CURDATE(), '14:00:00', 380.00, 220, 'available', NOW(), NOW()),
(9, 2, 11, CURDATE(), '18:00:00', 420.00, 220, 'available', NOW(), NOW()),
(9, 2, 11, CURDATE(), '22:00:00', 420.00, 220, 'available', NOW(), NOW()),
(9, 5, 22, CURDATE(), '13:00:00', 650.00, 60, 'available', NOW(), NOW()),
(9, 5, 22, CURDATE(), '17:00:00', 650.00, 60, 'available', NOW(), NOW()),
(9, 5, 22, CURDATE(), '21:00:00', 750.00, 60, 'available', NOW(), NOW()),

-- John Wick: Chapter 4 shows
(10, 4, 20, CURDATE(), '10:30:00', 400.00, 220, 'available', NOW(), NOW()),
(10, 4, 20, CURDATE(), '14:30:00', 400.00, 220, 'available', NOW(), NOW()),
(10, 4, 20, CURDATE(), '18:30:00', 450.00, 220, 'available', NOW(), NOW()),
(10, 4, 20, CURDATE(), '22:30:00', 450.00, 220, 'available', NOW(), NOW()),
(10, 5, 23, CURDATE(), '11:00:00', 550.00, 80, 'available', NOW(), NOW()),
(10, 5, 23, CURDATE(), '15:00:00', 550.00, 80, 'available', NOW(), NOW()),
(10, 5, 23, CURDATE(), '19:00:00', 600.00, 80, 'available', NOW(), NOW())
ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id);
