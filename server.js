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

