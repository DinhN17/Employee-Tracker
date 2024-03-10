const mysql = require('mysql2');

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'SQL@password',
//         database: 'employee_db'
//     }
// );
class Model {
    constructor(table) {
        //
        this.db = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'SQL@password',
                database: 'employee_db'
            }
        );
        // console.log(`Connected to the employee_db database.`)
        this.table = table;
        // this.columns = columns;
        // this.conditions = conditions;
    }

    async query(sql) {
        let promise = new Promise((resolve, reject) => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        });

        return promise.then((value) => {
            return value;
        });
    }

    async getColumn(column) {
        
        const sql = `SELECT ${column} FROM ${this.table}`;
        let arr = await this.query({sql, rowsAsArray: true,});
        return arr.map((x) => x[0]);
    }

    async viewAll() {
        const sql = `SELECT * FROM ${this.table}`;
        return this.query(sql);
    }
}

module.exports = Model