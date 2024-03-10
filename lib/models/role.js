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

    viewAll() {
        const sql = `SELECT 
                        role.id AS id, 
                        role.title AS title, 
                        department.name AS department, 
                        role.salary AS salary 
                    FROM role 
                    JOIN department ON role.department_id = department.id;`;
        return this.query(sql);
    }

}

module.exports = Role;