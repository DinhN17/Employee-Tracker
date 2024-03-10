const Model = require('./model');

class Role extends Model {
    constructor() {
        super('role');
    }

    getRoles() {
        return this.getColumn('title');
        // console.log(result);
    }

    addRole(title, salary, department) {
        const sql = `INSERT INTO ${this.table} (title, salary, department_id) VALUES ("${title}", ${salary}, "${department}")`;
        // console.log(sql);
        try {
            this.query(sql);
        } catch (error) {
            error ? console.log(error) : console.log(`Added ${title} to the database.`);            
        };
        console.log(`Added ${title} to the database.`);
    }

}

module.exports = Role;