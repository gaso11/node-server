CREATE Table auser
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    hash VARCHAR(255) NOT NULL
);

CREATE Table favs
(
    id SERIAL PRIMARY KEY NOT NULL,
    userID int REFERENCES auser(id),
    text VARCHAR(255) NOT NULL 
);

INSERT INTO auser(username, hash) VALUES ('gaso11', '16cd9c3e515a2ae7fa25fc02da138e9dc2cd00004864591a9fe776446cbcc99b');

INSERT INTO favs(userID, text) VALUES (1, 'Hello World');

GRANT SELECT, INSERT, UPDATE ON auser TO familyhistoryuser;
GRANT USAGE, SELECT ON SEQUENCE auser_id_seq TO familyhistoryuser;

GRANT SELECT, INSERT, UPDATE ON favs TO familyhistoryuser;
GRANT USAGE, SELECT ON SEQUENCE favs_id_seq TO familyhistoryuser;