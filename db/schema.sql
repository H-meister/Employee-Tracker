-- create department table
CREATE TABLE Departments (
    depID INTEGER AUTO_INCREMENT PRIMARY KEY,
    deparment_name VARCHAR(30) NOT NULL
);
-- create role table
CREATE TABLE Roles (
    roleID INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title TEXT NOT NULL,
    salary INTEGER NOT NULL
);
-- create employees table
CREATE TABLE Employees (
    ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    Manager VARCHAR(30),
    roleID INTEGER NOT NULL,
    depID INTEGER NOT NULL, 
    FOREIGN KEY(roleID) REFERENCES Roles(roleID),
    FOREIGN KEY(depID) REFERENCES Departments(depID)
);