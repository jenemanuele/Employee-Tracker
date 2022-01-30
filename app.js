const { prompt } = require('inquirer');

prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department',' add a role', 'add an employee', 'update an employee role']
    }
]).then(choice => {
    switch (choice) {
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

const viewDepartments = () =>  {
    const sql = `SELECT * FROM department;`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        employeeTracker();
    })
}

const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, name.department AS department FROM role
    INNER JOIN department ON role.department_id = department.id`;

    db.query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        employeeTracker();
    })
}




employeeTracker();