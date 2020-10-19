-- Comments given by prof

--
-- 4)Each Pet can be identified by their pid and has name and pet_type attributes
-- ==> why need pid?
--     why not name?  it's already ID dependency
--     you are saying someone owns two different pets with the same name?
--
-- 7)Each Requirement can be identified by their rid and has a description attribute
-- ==> why need rid?
--     would a single pet has two descriptions that are supposed to be same but has to be differentiated by rid?
--
-- 10)Each Care Takerâ€™s Availability slot can be identified by their Days of Week, Pet Type and Advertised Price
-- ==> day of week? monday to sunday?
--     so can only have 7 different one?  why?

--
-- 14)Each Leave can be identified by their lid and has start_date, end_date attributes
-- ==> why need lid?
--     why not use ID dependency? =? REMOVED

-- Things to change in ER diagram
-- ==> subclass in ISA hierarchy should not connect to the corner
--     to ease the reading
-- change name in Pets to pet_name
-- underline pet_name in Pets
-- remove pid in pets
-- remove lid in leave
-- remove rid in requirements
-- remove days of weeks in availabilities
-- add the_date, start_time, and end_time for availabilities
-- add the-date to bid
-- change start_date to start_time for bid
-- change end_date to end_time for bid
DROP TABLE IF EXISTS bids;
DROP TABLE IF EXISTS availabilities;

DROP TABLE IF EXISTS parttime_caretakers;

DROP TABLE IF EXISTS leaves_applied;
DROP TABLE IF EXISTS base_dailys;
DROP TABLE IF EXISTS fulltime_caretakers;

DROP TABLE IF EXISTS caretakers;
DROP TABLE IF EXISTS admins;

DROP TABLE IF EXISTS requirements;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS petowners;
DROP TABLE IF EXISTS users;

CREATE TABLE admins (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE caretakers (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE availabilities (
    username VARCHAR(50) REFERENCES caretakers (username) ON DELETE cascade,
    advertised_price NUMERIC NOT NULL,
    the_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    PRIMARY KEY (username, the_date, start_time, end_time, advertised_price)
);

CREATE TABLE fulltime_caretakers (
    username VARCHAR(50) PRIMARY KEY REFERENCES caretakers (username)
);

CREATE TABLE leaves_applied (
    ftct_username VARCHAR(50) REFERENCES fulltime_caretakers (username),
    start_date DATE,
    end_date DATE,
    PRIMARY KEY(ftct_username, start_date, end_date)
);

CREATE TABLE base_dailys (
    ftct_username VARCHAR(50) REFERENCES fulltime_caretakers (username),
    base_price NUMERIC,
    pet_type VARCHAR(20),
    PRIMARY KEY(ftct_username, base_price, pet_type)
);

CREATE TABLE parttime_caretakers (
    username VARCHAR(50) PRIMARY KEY REFERENCES caretakers (username)
);

CREATE TABLE petowners (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(256) NOT NULL,
    creditcard VARCHAR(256)
);

CREATE TABLE pets (
    petowner_username VARCHAR(50) REFERENCES petowners (username) ON DELETE cascade,
    pet_name VARCHAR(50) NOT NULL,
    pet_type VARCHAR(20) NOT NULL,
    PRIMARY KEY (petowner_username, pet_name)
);

CREATE TABLE requirements (
 	petowner_username VARCHAR(50),
    pet_name VARCHAR(50),
    description VARCHAR(200) NOT NULL,
    FOREIGN KEY (petowner_username, pet_name) REFERENCES pets(petowner_username, pet_name),
    PRIMARY KEY(petowner_username, pet_name, description)
);

CREATE TABLE bids (
    petowner_username VARCHAR(50),
    pet_name VARCHAR(50) NOT NULL,
    caretaker_username VARCHAR(50),
    the_date DATE,
    start_time TIME,
    end_time TIME,
    price NUMERIC NOT NULL,
    transfer_method VARCHAR(100) NOT NULL,
    review VARCHAR(200),
    rating INTEGER CHECK ((rating IS NULL) OR (rating >= 0 AND rating <= 5)),
    isSuccessful BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (petowner_username, pet_name) REFERENCES pets (petowner_username, pet_name),
    FOREIGN KEY (caretaker_username, the_date, start_time, end_time, price)
    REFERENCES availabilities (username, the_date, start_time, end_time, advertised_price),
    PRIMARY KEY (petowner_username, pet_name, caretaker_username, the_date, start_time, end_time),
    CHECK (petowner_username <> caretaker_username)
);
