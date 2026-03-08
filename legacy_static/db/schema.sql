-- =============================================
-- Kosova Travel Database Schema
-- Run this in phpMyAdmin or MySQL CLI
-- =============================================

CREATE DATABASE IF NOT EXISTS kosova_travel
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kosova_travel;

-- =============================================
-- Cities Table
-- =============================================
CREATE TABLE IF NOT EXISTS cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    population VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    attractions TEXT NOT NULL,
    sub_cities TEXT NOT NULL,
    best_season VARCHAR(255) DEFAULT NULL,
    badge VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Destinations Table
-- =============================================
CREATE TABLE IF NOT EXISTS destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    best_season VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Contacts Table
-- =============================================
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) DEFAULT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Seed Data: Cities
-- =============================================
INSERT INTO cities (name, region, population, description, image, attractions, sub_cities, best_season, badge) VALUES
(
    'Prishtina',
    'Kosovë Qendrore',
    '500,000+',
    'Prishtina, kryeqyteti i Kosovës, është qendra politike, kulturore dhe ekonomike e vendit. Me një popullatë të re dhe dinamike, qyteti ofron një përzierje unike të arkitekturës moderne dhe trashëgimisë historike.',
    'assets/images/prishtina.jpg',
    'Sheshi i Prishtinës, Biblioteka Kombëtare, Parku i Gërmisë, Ulpiana Antike, Pazari i Vjetër',
    'Prishtina, Podujeva, Fushë Kosova, Lipjani, Obiliqi, Drenasi',
    'Maj - Shtator',
    'Kryeqyteti'
),
(
    'Prizren',
    'Kosovë Jugperëndimore',
    '300,000',
    'Prizreni është ndoshta qyteti më pittoresk në Kosovë. Me kalajën e tij madhështore, urat historike dhe arkitekturën unike osmane, Prizreni është zemra kulturore e vendit dhe destinacioni numër një për turistët.',
    'assets/images/prizren.jpg',
    'Kalaja e Prizrenit, Lidhja e Prizrenit, Shadërvani, Xhamia e Sinan Pashës, Lumi Bistrica',
    'Prizren, Suharekë, Dragash, Mamushë',
    'Qershor - Gusht',
    'Historike'
),
(
    'Ferizaj',
    'Kosovë Jugore',
    '180,000',
    'Ferizaj është një nga qytetet më të rëndësishme në juglindje të Kosovës. Ai dallohet për pozitën e tij strategjike, historinë e pasur dhe natyrën e bukur përreth, veçanërisht Grykën e Kaçanikut.',
    'assets/images/ferii.jpg',
    'Parku i Lirisë, Qendra e Ferizajt, Gryka e Kaçanikut, Sheshi i Qytetit',
    'Ferizaj, Shtime, Kaçanik',
    'Pranverë dhe Vjeshtë',
    'Moderne'
),
(
    'Mitrovica',
    'Kosovë Veriore',
    '200,000',
    'Mitrovica shtrihet në veri të Kosovës dhe njihet si një qytet me histori të pasur industriale dhe kulturore. Ura e Ibrit, simbol i qytetit, dhe Liqeni i Gazivodës janë ndër atraksionet kryesore.',
    'assets/images/mitrovica.png',
    'Ura e Ibrit, Kalaja e Vushtrrisë, Liqeni i Gazivodës, Qendra e Mitrovicës',
    'Mitrovicë, Vushtrri, Skenderaj, Leposaviq',
    'Korrik - Shtator',
    'Unike'
),
(
    'Peja',
    'Kosovë Perëndimore',
    '170,000',
    'Peja është porta e Alpeve Shqiptare dhe një nga qytetet më të bukura të Kosovës. Gryka e Rugovës, Patrikanaja e Pejës dhe liqenat e mrekullueshme e bëjnë këtë qytet destinacionin kryesor për dashamirësit e natyrës.',
    'assets/images/peja.jpg',
    'Gryka e Rugovës, Patrikanaja e Pejës, Liqenat e Kuqishtes, Bjeshkët e Nemuna',
    'Pejë, Istog, Klinë, Deçan',
    'Qershor - Shtator',
    'Natyrore'
),
(
    'Gjakova',
    'Kosovë Jugperëndimore',
    '150,000',
    'Gjakova është qytet me trashëgimi të pasur kulturore dhe historike. Çarshia e Madhe, një nga pazaret më të mëdha në Ballkan, dhe Xhamia e Hadumit janë simbole të këtij qyteti të bukur.',
    'assets/images/gjakova.jpg',
    'Çarshia e Madhe, Xhamia e Hadumit, Ura e Terzive, Kisha e Shën Pjetrit',
    'Gjakovë, Rahovec, Malishevë',
    'Maj - Tetor',
    'Kulturore'
),
(
    'Gjilan',
    'Kosovë Lindore',
    '130,000',
    'Gjilani ndodhet në lindje të Kosovës dhe është qendër e rëndësishme ekonomike dhe arsimore. Qyteti ofron natyrë të bukur, parqe moderne dhe një atmosferë të këndshme për vizitorët.',
    'assets/images/gjilan.jpg',
    'Sheshi i Gjilanit, Parku i Qytetit, Kodra e Dëshmorëve, Liqeni i Livoçit',
    'Gjilan, Kamenicë, Viti, Novobërdë',
    'Pranverë dhe Vjeshtë',
    'Dinamike'
);

-- =============================================
-- Seed Data: Destinations (Tourist Sites)
-- =============================================
INSERT INTO destinations (city_id, name, description, image, best_season) VALUES
(1, 'Biblioteka Kombëtare', 'Një nga ndërtesat më ikonike të Prishtinës me arkitekturë unike brutualiste.', 'assets/images/prishtina.jpg', 'Gjatë gjithë vitit'),
(1, 'Parku i Gërmisë', 'Park natyror pranë Prishtinës, ideal për ecje dhe rekreacion.', 'assets/images/kosova.jpg', 'Pranverë - Vjeshtë'),
(1, 'Ulpiana Antike', 'Rrënojat e qytetit romak Ulpiana, një sit arkeologjik i rëndësishëm.', 'assets/images/prishtina.jpg', 'Maj - Shtator'),

(2, 'Kalaja e Prizrenit', 'Fortifikim mesjetar me pamje panoramike mbi qytetin e Prizrenit.', 'assets/images/prizren.jpg', 'Gjatë gjithë vitit'),
(2, 'Shadërvani', 'Sheshi qendror i Prizrenit, zemra e jetës sociale dhe kulturore.', 'assets/images/prizren1.jpg', 'Gjatë gjithë vitit'),
(2, 'Xhamia e Sinan Pashës', 'Xhami e shekullit XVI, një kryevepër e arkitekturës osmane.', 'assets/images/prizren.jpg', 'Gjatë gjithë vitit'),

(3, 'Gryka e Kaçanikut', 'Grykë natyrore spektakolare përgjatë lumit Lepenc.', 'assets/images/ferii.jpg', 'Pranverë - Vjeshtë'),
(3, 'Parku i Lirisë', 'Parku kryesor i Ferizajt, vend i pëlqyer për pushim dhe rekreacion.', 'assets/images/ferizaj1.jpg', 'Gjatë gjithë vitit'),

(4, 'Ura e Ibrit', 'Simbol i qytetit të Mitrovicës mbi lumin Ibër.', 'assets/images/mitrovica.png', 'Gjatë gjithë vitit'),
(4, 'Liqeni i Gazivodës', 'Liqen i madh artificial në veri të Kosovës, ideal për natyrën.', 'assets/images/mitrovica1.jpg', 'Korrik - Shtator'),

(5, 'Gryka e Rugovës', 'Grykë spektakolare me shkëmbinj të lartë, një nga bukuritë natyrore të Kosovës.', 'assets/images/peja.jpg', 'Maj - Shtator'),
(5, 'Patrikanaja e Pejës', 'Kompleks kishtar mesjetar, trashëgimi e UNESCO-s.', 'assets/images/peja.jpg', 'Gjatë gjithë vitit'),
(5, 'Liqenat e Kuqishtes', 'Liqena malore të bukura, ideale për ecje dhe natyrë.', 'assets/images/peja.jpg', 'Qershor - Shtator'),

(6, 'Çarshia e Madhe', 'Pazari historik i Gjakovës, një nga më të mëdhatë në Ballkan.', 'assets/images/gjakova.jpg', 'Gjatë gjithë vitit'),
(6, 'Xhamia e Hadumit', 'Xhami historike e shekullit XVII me arkitekturë të veçantë.', 'assets/images/gjakova.jpg', 'Gjatë gjithë vitit'),
(6, 'Ura e Terzive', 'Urë historike mbi lumin Erenik, simbol i qytetit.', 'assets/images/gjakova.jpg', 'Gjatë gjithë vitit'),

(7, 'Sheshi i Gjilanit', 'Sheshi qendror i qytetit, qendra e jetës sociale.', 'assets/images/gjilan.jpg', 'Gjatë gjithë vitit'),
(7, 'Kodra e Dëshmorëve', 'Memorial dhe hapësirë e gjelbër me pamje mbi qytet.', 'assets/images/gjilan.jpg', 'Pranverë - Vjeshtë'),
(7, 'Liqeni i Livoçit', 'Liqen natyror pranë Gjilanit, ideal për rekreacion.', 'assets/images/gjilan.jpg', 'Maj - Shtator');

-- =============================================
-- Users Table (Authentication)
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- User Photos Table
-- =============================================
CREATE TABLE IF NOT EXISTS user_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    city_name VARCHAR(100) NOT NULL,
    caption VARCHAR(255) DEFAULT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
