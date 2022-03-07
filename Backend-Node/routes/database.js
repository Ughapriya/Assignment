var mariadb = require('mariadb');

// Create a connection pool
var pool =
    mariadb.createPool({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "test123",
        database: "user"
    });

module.exports = {
    getConnection: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection().then((connection) => {
                resolve(connection);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}