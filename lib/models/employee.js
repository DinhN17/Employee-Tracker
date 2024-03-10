const Model = require('./model');

class Employee extends Model {
    constructor() {
        super('employee');
    }
    getManagers() {
        
    }
}

module.exports = Employee;