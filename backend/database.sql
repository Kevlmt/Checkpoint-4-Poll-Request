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
    password VARCHAR(255) NOT NULL,
    role ENUM ("USER", "ADMIN") DEFAULT "USER"
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
    userId INT NOT NULL,
    categoryId INT NOT NULL
  );

CREATE TABLE
  comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pollId INT NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT fk_polls_comments FOREIGN KEY (pollId) REFERENCES polls (id) ON DELETE CASCADE
  );

CREATE TABLE
  agrees (
    userId INT NOT NULL,
    pollId INT NOT NULL,
    CONSTRAINT fk_users_agree FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_polls_agree FOREIGN KEY (pollId) REFERENCES polls (id) ON DELETE CASCADE
  );

CREATE TABLE
  disagrees (
    userId INT NOT NULL,
    pollId INT NOT NULL,
    CONSTRAINT fk_users_disagree FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_polls_disagree FOREIGN KEY (pollId) REFERENCES polls (id) ON DELETE CASCADE
  );

CREATE TABLE
  follows (
    followerId INT NOT NULL,
    followedId INT NOT NULL,
    CONSTRAINT fk_follower_user FOREIGN KEY (followerId) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_followed_user FOREIGN KEY (followedId) REFERENCES users (id) ON DELETE CASCADE
  );

INSERT INTO
  categories (name)
VALUES
  ("Animal"),
  ("Random"),
  ("Politic"),
  ("Advice");

INSERT INTO
  users (
    email,
    firstname,
    lastname,
    pseudo,
    password,
    role
  )
VALUES
  (
    "kevin@gmail.com",
    "kevin",
    "lastname",
    "kékédu28",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI",
    "ADMIN"
  ),
  (
    "anis@gmail.com",
    "anis",
    "sakura",
    "sakuradu28",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI",
    "USER"
  ),
  (
    "thibault@gmail.com",
    "thibault",
    "hexagone",
    "tibononow",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI",
    "USER"
  ),
  (
    "enzo@gmail.com",
    "enzo",
    "leplubo",
    "zozo le boss",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI",
    "USER"
  ),
  (
    "vincent@gmail.com",
    "vincent",
    "centvint",
    "20 100",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI",
    "USER"
  ),
  (
    "jerem@gmail.com",
    "jerem",
    "tropfort",
    "JeremLeCrack",
    "$argon2id$v=19$m=4096,t=3,p=1$ft3DHyANZViLAXJM0hZ3IQ$Iht9Kb3IHGzrvJnVghxhSbLzlyRq5tRx+TH7QkKtGXI",
    "USER"
  );