-- -----------------------------------------------------------
-- The Kruegers Wedding Website
-- Senior Project GIT480
-- Database for RSVP page
-- -----------------------------------------------------------

-- Create database
CREATE DATABASE IF NOT EXISTS kruegers_wedding
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

-- Select the database
USE kruegers_wedding;


-- Invited Parties -------------------------------------------
-- Stores invitations and the number of invited guests

CREATE TABLE IF NOT EXISTS invited_parties (
    party_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_name VARCHAR(120) NOT NULL,
    invitation_code VARCHAR(32) NOT NULL UNIQUE,
    max_guests TINYINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_max_guests
        CHECK (max_guests BETWEEN 1 AND 6)

) ENGINE=InnoDB;



-- RSVP Responses --------------------------------------------
-- Stores attendance and contact information

CREATE TABLE IF NOT EXISTS rsvp_responses (
    response_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_id INT UNSIGNED NOT NULL,

    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(30),

    street_address VARCHAR(150) NOT NULL,
    address_line_2 VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state_region VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,

    attendance ENUM('yes', 'no') NOT NULL,
    song_request VARCHAR(150),
    note TEXT,

    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE (party_id),

    CONSTRAINT fk_rsvp_party
        FOREIGN KEY (party_id)
        REFERENCES invited_parties(party_id)
        ON DELETE RESTRICT

) ENGINE=InnoDB;



-- RSVP Guests -----------------------------------------------
-- Stores each individual guest attending the wedding

CREATE TABLE IF NOT EXISTS rsvp_guests (
    guest_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    response_id INT UNSIGNED NOT NULL,
    full_name VARCHAR(100) NOT NULL,

    CONSTRAINT fk_guest_response
        FOREIGN KEY (response_id)
        REFERENCES rsvp_responses(response_id)
        ON DELETE CASCADE

) ENGINE=InnoDB;
