-- CREATE DATABASE
CREATE DATABASE signup_signin;


-- CREATE TABLE

CREATE TABLE users(
    id serial NOT NULL,
    name text  NOT NULL,
    username text  PRIMARY KEY,
    password text  NOT NULL,
    phone integer NOT NULL
    
);