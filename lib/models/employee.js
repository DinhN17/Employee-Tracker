const Model = require('./model');

class Employee extends Model {
    constructor() {
        super('employee');
    }
    async getManagers() {
        const sql = `SELECT DISTINCT CONCAT(first_name, " ", last_name) AS name FROM ${this.table} WHERE manager_id IS NULL`;
        let arr = await this.query({sql, rowsAsArray: true,});
        return arr.map((x) => x[0]);
    }

    async getEmployees() {
        const sql = `SELECT CONCAT(first_name, " ", last_name) AS name FROM ${this.table}`;
        let arr = await this.query({sql, rowsAsArray: true,});
        return arr.map((x) => x[0]);
    }

    async getId(firstName, lastName) {
        const sql = `SELECT id FROM ${this.table} WHERE first_name = "${firstName}" AND last_name = "${lastName}"`;
        const result = await this.query(sql);
        return result[0].id;        
    }

    async delete(firstName, lastName) {
        const id = await this.getId(firstName, lastName);
        this.deleteById(id);
    }

    addEmployee(first_name, last_name, role_id, manager_id) {
        const sql = `INSERT INTO ${this.table} (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id})`;
        try {
            this.query(sql);
        } catch (error) {
            error ? console.log(error) : console.log(`Added ${first_name} ${last_name} to the database.`);
        };
        console.log(`Added ${first_name} ${last_name} to the database.`);
    }

    viewAll() {
        const sql = `SELECT 
                        emp.id AS id,
                        emp.first_name AS first_name,
                        emp.last_name AS last_name,
                        role.title AS title,
                        department.name AS department,
                        role.salary AS salary,
                        CONCAT(manager.first_name, " ", manager.last_name) AS manager 
                     FROM employee emp 
                     LEFT JOIN employee manager 
                        ON emp.manager_id = manager.id 
                     JOIN role 
                        ON emp.role_id = role.id 
                     JOIN department 
                        ON role.department_id = department.id`;
        return this.query(sql);
    }

    viewByColumn(column, value) {
        const sql = `SELECT 
                        emp.id AS id,
                        emp.first_name AS first_name,
                        emp.last_name AS last_name,
                        role.title AS title,
                        department.name AS department,
                        CONCAT(manager.first_name, " ", manager.last_name) AS manager 
                     FROM employee emp 
                     LEFT JOIN employee manager 
                        ON emp.manager_id = manager.id 
                     JOIN role 
                        ON emp.role_id = role.id 
                     JOIN department 
                        ON role.department_id = department.id
                     WHERE emp.${column} = ${value}`;
        return this.query(sql);
    }
}

module.exports = Employee;