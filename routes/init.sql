CREATE TABLE artists (
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  stage_name VARCHAR(255),
  sex VARCHAR(30) NOT NULL,
  date_of_birth DATE NOT NULL,
  email VARCHAR(100),
  genre VARCHAR(100) NOT NULL,
  records_sold BIGINT NOT NULL,
  active BOOLEAN NOT NULL,
  id_no BIGINT PRIMARY KEY
);