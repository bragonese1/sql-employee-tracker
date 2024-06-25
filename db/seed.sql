-- Insert values into the department table
INSERT INTO department (name) VALUES 
('Sales'), 
('Engineering'), 
('Finance'),
('Legal');

-- Insert values into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 120000, 1),
('Salesperson', 80000, 1),
('Software Engineer', 130000, 2),
('Lead Engineer', 180000, 2),
('Accountant', 90000, 3),
('Account Manager', 120000, 3),
('Legal Lead', 285000, 4),
('Lawyer', 185000, 4);

-- Insert values into the department table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jayson', 'Tatum', 1, 2),
('Jrue', 'Holiday', 2, NULL),
('Al', 'Horford', 3, NULL),
('Jaylen', 'Brown', 4, 1),
('Derrick', 'White', 5, NULL),
('Kristaps', 'Porzingis', 6, NULL),
('Larry', 'Bird', 7, 3),
('Bill', 'Russell', 8, NULL);

