const { prompt } = require('inquirer');
// const db = require('./db/connection');
const mysql = require('mysql2');


prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department',' add a role', 'add an employee', 'update an employee role']
    }
]).then(choice => {
    console.log('choice selected! :', choice.options);
    switch (choice.options) {
        case 'view all departments':
            viewDepartments();
            break;
        case 'view all roles':
            viewRoles();
            break;
        case 'view all employees':
            viewEmployees();
            break;
        case 'add a department':
            addDepartment();
            break;
        case 'add a roles':
            addRole();
            break;
        case 'add an employee':
            addEmployee();
            break;
        case 'update an employee role':
            updateRole();
            break;
    }
});

viewDepartments =>  {
    const sql = `SELECT * FROM department;`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        viewDepartments();
    })
}

const viewRoles = () => {
    console.log("HELLO!");
    const sql = `SELECT role.id, role.title, role.salary, name.department AS department FROM role
    INNER JOIN department ON role.department_id = department.id`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        // viewEmployees();
    })
}

viewEmployees => {
    const sql = `SELECT * FROM employee;`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
       viewEmployees();
    })
}

addDepartment => {
    prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'Please enter new department name.'
        }        
    ]).then((answer) => {
        const sql = `INSERT INTO department (name) VALUES ("${answer.newDepartment}")`;

        db.query(sql, (error, response) => {
            if (error) throw error;
            console.table(response);
            // want to say department added in app
            // console.log(answer.newDepartment + 'Department added!')
        });
    });
};

addRole => {
    prompt([
        {
            name: 'newRoleTitle',
            type: 'input',
            message: "What is the new role's title?"        
        },
        {
            name: 'newRoleSalary',
            type: 'input',
            message: "What is the new role's salary?"
        }            
    ]).then((answer) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.newRoleTitle}", "${answer.newRoleSalary}");`;

        db.query(sql,(error, response) => {
            if (error) throw error;
            viewRoles();
        });
    });
};

addEmployee => {
    prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "What is the employee's first name?"
        },
        {
            name: 'lastName',
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: 'roleType',
            type: 'input',
            message: "What is the employee's role?"
        }, 
        {
            name: 'addManager',
            type: 'input',
            message: "What number is this employee's manager id?"
        }
    ]).then((answer) => {
        const sql =`INSERT INTO employee (first_name, last_name, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", "${answer.roleType}", "${answer.addManager}");`;

        db.query(sql, (error, response) =>{
            if (error) throw error;
            addEmployee();

        });
    });
};

