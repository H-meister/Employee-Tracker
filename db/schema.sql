DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- create department table
CREATE TABLE Departments (
    depID INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);
-- create role table
CREATE TABLE Roles (
    roleID INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title TEXT NOT NULL,
    salary INTEGER NOT NULL,
    depID INTEGER NOT NULL,
    CONSTRAINT fk_depid FOREIGN KEY(depID) REFERENCES Departments(depID)
);

-- create employees table
CREATE TABLE Employees (
    ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    Manager INTEGER,
    roleID INTEGER NOT NULL,
    depID INTEGER, 
    CONSTRAINT fk_roleID FOREIGN KEY(roleID) REFERENCES Roles(roleID),
    CONSTRAINT fk_manager FOREIGN KEY(Manager) REFERENCES Employees(ID)
);