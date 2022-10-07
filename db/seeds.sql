INSERT INTO Departments (deparment_name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO Roles (job_title, salary)
VALUES
('Sales Lead', 10000),
('Sales Person', 80000),
('Junior Engineer', 120000),
('Lead Engineer', 150000),
('Accountant', 125000),
('Account Manager', 160000),
('Legal Team Lead', 250000),
('Lawyer', 190000);

INSERT INTO Employees (first_name, last_name, manager, roleID, depID)
VALUES
('John', 'Doe', '', 3, 1),
('Hector', 'Guerrero', '', 4, 1),
('Casey', 'Outen', 'Hector Guerrero', 3, 1);