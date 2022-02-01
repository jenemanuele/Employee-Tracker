const { prompt } = require('inquirer');
const db = require('./db/connection');
const mysql = require('mysql2');
// import { table } from 'table';


prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department','add a role', 'add an employee', 'update an employee role']
    }
]).then(choice => {
    //console.log('choice selected! :', choice.options);
        
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
        case 'add a role':
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

viewDepartments = () =>  {
    const sql = `SELECT * FROM department;`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        
    })
}

const viewRoles = () => {
    console.log("HELLO!");
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department FROM role
    INNER JOIN department ON role.department_id = department.id`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);       
    })
}

const viewEmployees = () => {
    const sql = `SELECT * FROM employee;`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);      
    })
}

const addDepartment = () => {
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
             console.log(answer.newDepartment +  ' department added!')
        });
    });
};

const addRole = () => {
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
        },
        {
            name: 'newDepartment',
            type: 'input', 
            message: 'Which department is the role in?'
        }           
    ]).then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.newRoleTitle}", "${answer.newRoleSalary}", (SELECT department.id FROM department WHERE department.name = "${answer.newDepartment}"));`;

        db.query(sql,(error, response) => {
            if (error) throw error;
            console.log(answer.newRoleTitle +  '  role added!')
            
        });
    });
};


const addEmployee = () => {
    prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'What is the employee id?',
            choices: [1, 2, 3, 4, 5]
        },        
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
            type: 'list',
            name: 'roleId',
            message: "What is the employee's role id?",
            choices: [1, 2, 3, 4, 5, 6]
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'What is the manager ID number?',
            choices: [1, 2, 3]
        }
    ]).then((answer) => {
        const sql =`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ("${answer.employeeId}", "${answer.firstName}", "${answer.lastName}", "${answer.roleId}", "${answer.managerId}"`;

        db.query(sql, (error, response) => {
            if (error) throw error;
            console.log(answer.firstName + answer.lastName + '  is added to the employee database!')

        });
    });
};

// const updateEmployee = () => {
//     prompt([
//         {
//             type: 'options',
//             name: 'previousId',
//             message: 'What is the current employee role id?',
//             choices: '1, 2, 3, 4, 5, 6'
//         }
//         {
//             type: 'options',
//             name: 'updateRole',
//             message: 'What is the new role id (number) of the employee?',
//              choices: '1, 2, 3, 4, 5'
//         }
//     ]).then((answer) => {
//         const sql='SELECT first_name, last_name, role_id FROM employee WHERE ';

//         db.query(sql, (error, response) => {
//             if (error) throw error;
//             console.log(answer.updateRole + ' role updated in employee database!')
//         })
//     })
// }