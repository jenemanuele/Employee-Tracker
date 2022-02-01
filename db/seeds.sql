INSERT INTO department(name)
VALUES ('Sales'), ('HR'), ('Engineering');

INSERT INTO role(title, salary, department_id)
VALUES ('Manager', 40000, 1), ('Manager', 600000, 2), ('Manager', 90000, 3);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ('John', 'Smith', 1), ('Anna', 'Smith', 2), ('Kate', 'Smith', 3);