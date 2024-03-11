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

    // getColumn() returns an array of the column values
    async getColumn(column) {
        
        const sql = `SELECT ${column} FROM ${this.table}`;
        let arr = await this.query({sql, rowsAsArray: true,});
        return arr.map((x) => x[0]);
    }

    async getId(column, value) {
        const sql = `SELECT id FROM ${this.table} WHERE ${column} = "${value}"`;
        const result = await this.query(sql);
        // console.log(result[0].id);
        return result[0].id;//[{id: 1}]
    }

    async updateById(id, column, value) {
        const sql = `UPDATE ${this.table} SET ${column} = ${value} WHERE id = ${id}`;
        try {
            this.query(sql);
        } catch (error) {
            if (error) console.log(error);
        };
        console.log(`Updated the item with id: ${id} in ${this.table}.`);
    }

    async deleteById(id) {
        const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;
        
        try {
            this.query(sql);
        } catch (error) {
            if (error) console.log(error);
        }
        console.log(`Deleted the item with id: ${id} from ${this.table}.`);
    }

    async viewAll() {
        const sql = `SELECT * FROM ${this.table}`;
        return this.query(sql);
    }
}

module.exports = Model