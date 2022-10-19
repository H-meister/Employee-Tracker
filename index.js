const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const Employee = require('./lib/employee');

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees_db'
    }
);

db.connect(err => {
    if (err) throw err;
    console.log('Conntected!')
    init();
});

init = () => {
    inquirer.prompt([
        { 
            type: 'list',
            name: 'choices',
            message: 'Please Choose From the Following:',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
        }
    ])
    .then((answers => {
       //goes to appropriate function when it is called!
        if(answers.choices === 'view all departments' ){
            departments();
        }
        if(answers.choices === 'view all roles'){
            roles();
        }
        if(answers.choices === 'view all employees'){
            employees();
        }
        if(answers.choices === 'add a department'){
            addDepartment();
        }
        if(answers.choices === 'add a role'){
            addRole();
        }
        if(answers.choices === 'add an employee'){
            addEmployee();
        }
        if(answers.choices === 'update an employee role'){
            updateRole();
        }
        if(answers.choices === 'exit'){
            exit();
        }
    }));
}; 
//shows departments to the user!
departments = () => {
    console.log('Now showing departments!');
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    });
};
//shows roles to the user!
roles = () => {
    console.log('Now showing roles!');
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    });
};
//shows employees to the user!
employees = () => {
    console.log('Now showing employees!');
    const sql = `SELECT Employees.ID, Employees.first_name, Employees.last_name, Roles.job_title, Roles.salary, Departments.department_name,
     Manager.first_name AS Manager FROM Employees LEFT JOIN Roles ON Employees.roleID = Roles.roleID
     LEFT JOIN Departments ON Roles.depID = Departments.depID
     LEFT JOIN Employees Manager ON Manager.ID = Employees.Manager;`;

    db.query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        init();
    });
};
//adds a department from the console.
addDepartment = () => {
    inquirer.prompt([
        {
            type:'input',
            name:'addDep',
            message: 'What department would you like to add?'
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO departments (department_name) VALUES (?)`;
        db.query(sql, answer.addDep, (err, result) => {
            if (err) throw err;
            console.log(answer.addDep + 'Added');
            departments();
        })
    })
};
//adds a role from the console.
addRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'addRole',
            message: 'What Role would you like to add?'
        },
        {
            type: 'input',
            name: 'addSal',
            message: 'Please give a salary'
        }
    ])
    .then(answers => {
        const results = [answers.addRole, answers.addSal];
        const depsql = `SELECT department_name, depID FROM departments`;
        db.query(depsql, (err, data) => {
            if(err) throw err;

            const dep = data.map(({ department_name, depID }) => ({ name: department_name, value: depID }));
            inquirer.prompt([
                {
                    type:'list',
                    name:'depName',
                    message: 'What department is this role in?',
                    choices: dep
                }
            ])
            .then(answers => {
                const allResults = answers.depName;
                results.push(allResults);

                const sql = `INSERT INTO roles (job_title, salary, depID) VALUES (?, ?, ?)`;

                db.query(sql, results, (err, results) => {
                    if(err) throw err;
                    console.log(answers.addRole + 'added!');
                    roles();
                })
            })
        })
    })
};

//adds an employee from the console.
addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the first name of your employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the last name of your employee'
        }
    ])
    .then(empAnswers => {
        const getRole = `SELECT job_title, roleID, depID FROM roles`
        db.query(getRole, (err, data) =>{
            const rol = data.map(({ job_title, roleID }) => ({ name: job_title, value: roleID }));
            if(err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleList',
                    message: 'Please choose what their role will be:',
                    choices: rol
                }
            ])
            .then(roleIDAnswer => {
                const getManager = `SELECT * FROM employees`;
                db.query(getManager, (err, data) => {
                    if(err) throw err;

                    const manager = data.map(({ ID, first_name, last_name }) => ({ name: first_name + " " + last_name, value: ID}));
                    inquirer.prompt([
                        {
                            type:'list',
                            name: 'manager',
                            message: 'Please choose the employees manager!',
                            choices: manager
                        }
                    ])
                    .then(managerAnswer => {
                        const choices = {
                            first_name: empAnswers.firstName,
                            last_name: empAnswers.lastName,
                            roleID: roleIDAnswer.roleList, 
                            Manager: managerAnswer.manager};

                        console.log(choices);

                        const sql = `INSERT INTO Employees SET ?`
                        db.query(sql, choices, (err, results) => {
                            if(err) throw err;
                            console.log('Employee added to the database!');

                            employees();
                        })

                    })
                })
                
            })
        })
    })
};

updateRole = () => {
    
    const getEmployee = `SELECT * FROM employees`
    db.query(getEmployee, (err, data) => {
        if(err) throw err;
        
        const empData = data.map(({ ID, first_name, last_name}) => ({Name: first_name + " " + last_name, Value: ID}));
        console.log(empData);
    inquirer.prompt([
        {
            type: 'list',
            name: 'update',
            message: 'Please choose an employee you would like to update :)',
            choices: empData
        }
    ])
    .then(answer => {
        console.log(answer);
    })
    })
    // console.log('This should update the role of an employee!');
    init();
};
//closes the app!
exit = () => {
    console.log('Thank you for using our app!');
    process.exit();
};



