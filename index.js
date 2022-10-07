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
    const sql = `SELECT job_title, salary FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    });
};
//shows employees to the user!
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

addEmployee = () => {
    console.log('This should add an employee!');
    init();
};

updateRole = () => {
    console.log('This should update the role of an employee!');
    init();
};
//closes the app!
exit = () => {
    console.log('Thank you for using our app!');
    process.exit();
};



