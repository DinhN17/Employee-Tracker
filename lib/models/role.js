const Model = require('./model');

class Role extends Model {
    constructor() {
        super('role');
    }

    getRoles() {
        return this.getColumn('title');
        // console.log(result);
    }

}

module.exports = Role;