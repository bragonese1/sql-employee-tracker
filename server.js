// Importing the inquirer package and connecting to db connection.js
const inquirer = require('inquirer'); 
const db = require('./db/connection');

 // Function to start the inquirer prompt for user
const startTracker = () => {

  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?', // question for the user as shown in readme
    // Options for the user
    choices: [
      'View all departments', 
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role', 
      'Add an employee', 
      'Update an employee role',
      'Exit' 
    ]
  }).then(({ action }) => {
    // Using the switch statment to handle the user's choice and returning the function selected
    switch (action) {
      case 'View all departments':
        return viewAllDepartments();
      case 'View all roles':
        return viewAllRoles();
      case 'View all employees':
        return viewAllEmployees();
      case 'Add a department':
        return addDepartment();
      case 'Add a role':
        return addRole();
      case 'Add an employee':
        return addEmployee();
      case 'Update an employee role':
        return updateEmployeeRole();
      case 'Exit':
        db.$pool.end(); // end connection with the db
        process.exit(); // exit inquirer
    }
  });
};

const viewAllDepartments = () => {
    // Display all departments
    db.any('SELECT * FROM department')
      .then(departments => {
        console.table(departments);
        startTracker();
      })
      .catch(err => console.error(err));
  };
  
  const viewAllRoles = () => {
    // Display all roles
    db.any(`
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      LEFT JOIN department ON role.department_id = department.id
    `)
      .then(roles => {
        console.table(roles);
        startTracker();
      })
      .catch(err => console.error(err));
  };
  
  const viewAllEmployees = () => {
    // Display all employees
    db.any(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON manager.id = employee.manager_id
    `)
      .then(employees => {
        console.table(employees);
        startTracker();
      })
      .catch(err => console.error(err));
  };
  