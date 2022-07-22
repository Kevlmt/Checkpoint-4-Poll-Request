SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
  time_zone = "+00:00";

CREATE TABLE
  users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    imgLink VARCHAR(255) NULL,
    pseudo VARCHAR(80) NOT NULL,
    password VARCHAR(255) NOT NULL
  );

CREATE TABLE
  categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL
  );

CREATE TABLE
  polls (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    users_id INT NOT NULL,
    categories_id INT NOT NULL
  );

CREATE TABLE
  comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    polls_id INT NOT NULL,
    users_id INT NOT NULL,
    CONSTRAINT fk_polls_comments FOREIGN KEY (polls_id) REFERENCES polls(id) ON DELETE CASCADE
  );

CREATE TABLE
  agree (
    users_id INT NOT NULL,
    polls_id INT NOT NULL,
    CONSTRAINT fk_users_agree FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_polls_agree FOREIGN KEY (polls_id) REFERENCES polls(id) ON DELETE CASCADE
  );

CREATE TABLE
  disagree (
    users_id INT NOT NULL,
    polls_id INT NOT NULL,
    CONSTRAINT fk_users_disagree FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_polls_disagree FOREIGN KEY (polls_id) REFERENCES polls(id) ON DELETE CASCADE
  );

INSERT INTO
  categories (name)
VALUES
  ("Animals"),
  ("Random"),
  ("Politics"),
  ("Advices");

INSERT INTO
  users (email, firstname, lastname, pseudo, password)
VALUES
  (
    "kevin@gmail.com",
    "kevin",
    "lastname",
    "kékédu28",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI"
  ),
  (
    "anis@gmail.com",
    "anis",
    "sakura",
    "sakuradu28",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI"
  ),
  (
    "thibault@gmail.com",
    "thibault",
    "hexagone",
    "tibononow",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI"
  ),
  (
    "enzo@gmail.com",
    "enzo",
    "leplubo",
    "zozo le boss",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI"
  ),
  (
    "vincent@gmail.com",
    "vincent",
    "centvint",
    "20 100",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI"
  ),
  (
    "jerem@gmail.com",
    "jerem",
    "tropfort",
    "JeremLeCrack",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI"
  );