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

    async getId(firstName, lastName) {
        const sql = `SELECT id FROM ${this.table} WHERE first_name = "${firstName}" AND last_name = "${lastName}"`;
        const result = await this.query(sql);
        return result[0].id;        
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
}

module.exports = Employee;