const Model = require('./model');

class Department extends Model {
    constructor() {
        super('department');
    }

    getDepartments() {
        return this.getColumn('name');
    }
}

module.exports = Department;