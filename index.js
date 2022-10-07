const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
            addEmployee
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

employees = () => {
    console.log('Now showing employees!');
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        init();
    });
};

addDepartment = () => {
    console.log('This should add a department!');
    init();
};

addRole = () => {
    console.log('This should add a role!');
    init();
};

addEmployee = () => {
    console.log('This should add an employee!');
    init();
};

updateRole = () => {
    console.log('This should update the role of an employee!');
    init();
};

exit = () => {
    console.log('Thank you for using our app!');
    process.exit();
}



