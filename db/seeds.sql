INSERT INTO Departments (department_name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO Roles (job_title, salary, depID)
VALUES
('Sales Lead', 10000, 4),
('Sales Person', 80000, 4),
('Junior Engineer', 120000, 1),
('Lead Engineer', 150000, 1),
('Accountant', 125000, 2),
('Account Manager', 160000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3);

INSERT INTO Employees (first_name, last_name, manager, roleID, depID)
VALUES
('John', 'Doe', '', 3, 1),
('Hector', 'Guerrero', '', 4, 1),
('Casey', 'Outen', 'Hector Guerrero', 3, 1);