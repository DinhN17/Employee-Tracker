const Model = require('./model');

class Department extends Model {
    constructor() {
        super('department');
    }

    getDepartments() {
        return this.getColumn('name');
    }

    async getDepartmentId(name) {
        const sql = `SELECT id FROM ${this.table} WHERE name = "${name}"`;
        const result = await this.query(sql);
        // console.log(result[0].id);
        return result[0].id;//[{id: 1}]
    }

    getTotalUtilizedBudget(departmentName) {
        const sql = `SELECT SUM(role.salary) AS Total_Utilized_budget_of_${departmentName}_department
                        FROM ${this.table} 
                        JOIN role 
                            ON role.department_id = department.id 
                        JOIN employee 
                            ON role.id = employee.role_id 
                        WHERE department.name = "${departmentName}";`;
        return this.query(sql);
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