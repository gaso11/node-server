CREATE TABLE person
(
    id SERIAL PRIMARY KEY NOT NULL,
    first VARCHAR(100) NOT NULL,
    last VARCHAR(100),
    birthdate date
);

INSERT INTO person(first, last, birthdate) VALUES ('Garry', 'Lewis', '1960-04-30');
INSERT INTO person(first, last, birthdate) VALUES ('Evan', 'Lewis', '1920-02-18');
INSERT INTO person(first, last, birthdate) VALUES ('Mary', 'Pass', '1849-08-06');

CREATE USER familyhistoryuser WITH PASSWORD 'elijah';

GRANT SELECT, INSERT, UPDATE ON person TO familyhistoryuser;
GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO familyhistoryuser;