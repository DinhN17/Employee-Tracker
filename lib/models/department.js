const Model = require('./model');

class Department extends Model {
    constructor() {
        super('department');
    }

    getDepartments() {
        return this.getColumn('name');
    }

    addDepartment(name) {
        const sql = `INSERT INTO ${this.table} (name) VALUES ("${name}")`;
        try {
            this.query(sql);
        } catch (error) {
            error ? console.log(error) : console.log(`Added ${name} to the database.`);            
        };
        console.log(`Added ${name} to the database.`);
    }
}

module.exports = Department;