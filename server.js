// Importing the inquirer package and connecting to db connection.js
const inquirer = require('inquirer'); 
const db = require('./config/connection.js');

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
        db.end(); // end connection with the db
        process.exit(); // exit inquirer
    }
  });
};

const viewAllDepartments = () => {
    // Display all departments
    db.query('SELECT * FROM department')
      .then(departments => {
        console.table(departments);
        startTracker();
      })
      .catch(err => console.error(err));
  };
  
  const viewAllRoles = () => {
    // Display all roles
    db.query(`
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
    db.query(`
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

  // Adding department, role, and employee to the db
    
  const addDepartment = () => {
    // Ask user for department name and add it to the db
    inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Please enter the department:'
    }).then(({ name }) => {
      // add department to db
      db.none('INSERT INTO department (name) VALUES ($1)', [name])
        .then(() => {
          console.log(`Department: ${name} has been added`); // message that department was added successful
          startTracker(); 
        })
        .catch(err => console.error(err));
    });
  };
  
  const addRole = () => {
    // Ask user for role specifics and add it to the db
    db.query('SELECT * FROM department')
      .then(departments => {
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Please enter the role:'
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary:'
          },
          {
            type: 'list',
            name: 'department_id',
            message: 'Please select the department:',
            choices: departments.map(department => ({
              name: department.name,
              value: department.id
            }))
          }
        ]).then(({ title, salary, department_id }) => {
          // add role to db
          db.none('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id])
            .then(() => {
              console.log(`Role: ${title} has been added`); // Message that a role was added successfully
              startTracker(); 
            })
            .catch(err => console.error(err));
        });
      })
      .catch(err => console.error(err));
  };
  
  const addEmployee = () => {
    // Asking user for employee info to add them to the db
    db.query('SELECT * FROM role')
      .then(roles => {
        db.query('SELECT * FROM employee')
          .then(employees => {
            inquirer.prompt([
              {
                type: 'input',
                name: 'first_name',
                message: 'Please enter a first name:'
              },
              {
                type: 'input',
                name: 'last_name',
                message: 'Please enter a last name:'
              },
              {
                type: 'list',
                name: 'role_id',
                message: 'Please select a role:',
                choices: roles.map(role => ({
                  name: role.title,
                  value: role.id
                }))
              },
              {
                type: 'list',
                name: 'manager_id',
                message: 'Please select the manager:',
                choices: [{ name: 'None', value: null }].concat(employees.map(employee => ({
                  name: `${employee.first_name} ${employee.last_name}`,
                  value: employee.id
                })))
              }
            ]).then(({ first_name, last_name, role_id, manager_id }) => {
              // add employee into db
              db.none('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id])
                .then(() => {
                  console.log(`Employee: ${first_name} ${last_name} has been added`); // Message that employee was added
                  startTracker();
                })
                .catch(err => console.error(err));
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  
  module.exports = startTracker;
  
  startTracker();