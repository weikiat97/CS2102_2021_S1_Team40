
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

DROP FUNCTION IF EXISTS func_check_leaves_date_overlap_insert();
DROP FUNCTION IF EXISTS func_check_leaves_date_overlap_update();
DROP FUNCTION IF EXISTS func_check_leaves_blocks_insert();
DROP FUNCTION IF EXISTS func_check_leaves_blocks_update();
DROP FUNCTION IF EXISTS func_check_avail_overlap_insert();

DROP TRIGGER IF EXISTS tr_check_leaves_date_overlap_insert ON leaves_applied;
DROP TRIGGER IF EXISTS tr_check_leaves_date_overlap_update ON leaves_applied;

DROP TRIGGER IF EXISTS tr_check_leaves_blocks_insert ON leaves_applied;
DROP TRIGGER IF EXISTS tr_check_leaves_blocks_update ON leaves_applied;

DROP TRIGGER IF EXISTS tr_check_avail_overlap_insert ON availabilities;

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
    pet_type VARCHAR(20) NOT NULL,
    advertised_price NUMERIC NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (username, start_date, end_date, advertised_price, pet_type)
);

CREATE TABLE fulltime_caretakers (
    username VARCHAR(50) PRIMARY KEY REFERENCES caretakers (username)
);

CREATE TABLE leaves_applied (
    ftct_username VARCHAR(50) REFERENCES fulltime_caretakers (username),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    num_of_days NUMERIC NOT NULL,
    CHECK (num_of_days >= 1),
    PRIMARY KEY(ftct_username, start_date, end_date)
);

CREATE TABLE base_dailys (
    ftct_username VARCHAR(50) REFERENCES fulltime_caretakers (username),
    base_price NUMERIC,
    pet_type VARCHAR(20) NOT NULL,
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
    special_requirements VARCHAR(256),
    PRIMARY KEY (petowner_username, pet_name)
);

-- CREATE TABLE requirements (
--  	petowner_username VARCHAR(50),
--     pet_name VARCHAR(50),
--     description VARCHAR(200) NOT NULL,
--     FOREIGN KEY (petowner_username, pet_name) REFERENCES pets(petowner_username, pet_name),
--     PRIMARY KEY(petowner_username, pet_name, description)
-- );

CREATE TABLE bids (
    petowner_username VARCHAR(50),
    pet_name VARCHAR(50) NOT NULL,
    caretaker_username VARCHAR(50),
    start_date DATE,
    end_date DATE,
    price NUMERIC NOT NULL,
    transfer_method VARCHAR(100) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    review VARCHAR(200),
    rating INTEGER CHECK ((rating IS NULL) OR (rating >= 0 AND rating <= 5)),
    isSuccessful BOOLEAN DEFAULT NULL,
    FOREIGN KEY (petowner_username, pet_name) REFERENCES pets (petowner_username, pet_name),
    PRIMARY KEY (petowner_username, pet_name, caretaker_username, start_date, end_date),
    CHECK (petowner_username <> caretaker_username)
);

CREATE FUNCTION func_check_leaves_date_overlap_insert() RETURNS trigger AS
    $$
    BEGIN
    IF (EXISTS
            (
                SELECT 1
                FROM leaves_applied L
                WHERE NEW.ftct_username = L.ftct_username 
                    AND (NEW.start_date <= L.end_date AND L.start_date <= NEW.end_date)              
            )
        )
    THEN 
        RAISE EXCEPTION 'The added leave must not overlap with any current leaves';
    END IF;

    RETURN NEW;

    END;
    $$
    LANGUAGE 'plpgsql';

CREATE FUNCTION func_check_leaves_date_overlap_update() RETURNS trigger AS
    $$
    BEGIN
    IF (EXISTS
            (
                SELECT 1
                FROM ( SELECT * FROM leaves_applied 
                        EXCEPT
                        SELECT * FROM leaves_applied
                        WHERE ftct_username = OLD.ftct_username
                            AND start_date = OLD.start_date
                            AND end_date = OLD.end_date
                     ) as L
                WHERE NEW.ftct_username = L.ftct_username 
                    AND (NEW.start_date <= L.end_date AND L.start_date <= NEW.end_date)              
            )
        )
    THEN 
        RAISE EXCEPTION 'The updated leave must not overlap with any current leaves. OLD start: %, OLD end: %, NEW start: %, NEW end: %', OLD.start_date, OLD.end_date, NEW.start_date, NEW.end_date;
    END IF;

    RETURN NEW;

    END;
    $$
    LANGUAGE 'plpgsql';


CREATE FUNCTION func_check_leaves_blocks_insert() RETURNS trigger AS
    $$
    BEGIN
    IF (NOT EXISTS
            (
                SELECT COUNT(*)
                FROM leaves_applied L
                WHERE NEW.ftct_username = L.ftct_username 
                    AND (
                        (NEW.start_date > 150 + L.end_date
                            AND NOT EXISTS ( SELECT 1
                                                FROM leaves_applied L1
                                                WHERE L1.start_date > L.end_date
                                                    AND L1.start_date < NEW.start_date )
                        )
                        OR (NEW.end_date + 150 < L.start_date
                            AND NOT EXISTS ( SELECT 1
                                                FROM leaves_applied L2
                                                WHERE L2.start_date > NEW.end_date
                                                    AND L2.start_date < L.start_date )
                            )
                        OR (NEW.start_date > 150 + CURRENT_DATE 
                            AND NOT EXISTS ( SELECT 1
                                                FROM leaves_applied L3
                                                WHERE L3.start_date < NEW.start_date
                                                    AND L3.start_date > CURRENT_DATE )
                            )
                        OR (NEW.start_date > 300 + CURRENT_DATE 
                            AND NOT EXISTS ( SELECT 1
                                                FROM leaves_applied L4
                                                WHERE L4.start_date < NEW.start_date
                                                    AND L4.start_date > CURRENT_DATE )
                            ) 
                        OR (NEW.end_date + 150 < CURRENT_DATE + 365 
                            AND NOT EXISTS ( SELECT 1
                                                FROM leaves_applied L5
                                                WHERE L5.start_date > NEW.end_date
                                                    AND L5.start_date < CURRENT_DATE + 365 )
                            )
                        OR (NEW.end_date + 300 < CURRENT_DATE + 365 
                            AND NOT EXISTS ( SELECT 1
                                                FROM leaves_applied L5
                                                WHERE L5.start_date > NEW.end_date
                                                    AND L5.start_date < CURRENT_DATE + 365 )
                            )
                    )
                GROUP BY NEW.ftct_username
                HAVING COUNT >= 2

            )
        )
    THEN 
        RAISE EXCEPTION 'If you add this leave, you will not have 2 x 150 days of work!';
    END IF;

    RETURN NEW;

    END;
    $$
    LANGUAGE 'plpgsql';


CREATE FUNCTION func_check_avail_overlap_insert() RETURNS TRIGGER AS
    $$
    BEGIN
    IF (EXISTS
            (
                SELECT 1
                FROM availabilities a
                WHERE NEW.username = a.username
                    AND NEW.pet_type = a.pet_type
                    AND (NEW.start_date <= a.end_date AND NEW.end_date >= a.start_date)
            )
        )
    THEN RAISE EXCEPTION 'The new availability must not overlap with any current availability of the same pet type';
    END IF;

    RETURN NEW;
    END;
    $$
    LANGUAGE 'plpgsql';

CREATE TRIGGER tr_check_leaves_date_overlap_insert BEFORE INSERT
ON leaves_applied FOR EACH ROW EXECUTE PROCEDURE func_check_leaves_date_overlap_insert();

CREATE TRIGGER tr_check_leaves_date_overlap_update BEFORE UPDATE
ON leaves_applied FOR EACH ROW EXECUTE PROCEDURE func_check_leaves_date_overlap_update();

CREATE TRIGGER tr_check_leaves_blocks_insert BEFORE INSERT
ON leaves_applied FOR EACH ROW EXECUTE PROCEDURE func_check_leaves_blocks_insert();

CREATE TRIGGER tr_check_leaves_blockt_update BEFORE UPDATE
ON leaves_applied FOR EACH ROW EXECUTE PROCEDURE func_check_leaves_blocks_update();

CREATE TRIGGER tr_check_avail_overlap_insert BEFORE INSERT
on availabilities FOR EACH ROW EXECUTE PROCEDURE func_check_avail_overlap_insert();
