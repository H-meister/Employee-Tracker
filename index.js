const inquirer = require('inquirer');
const mysql = require('mysql2');

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: ''
    }
);

//TODO
    // create inquirer do display questions on how the user would like to continue
    // figure out and requirer the table showing on inquirer.