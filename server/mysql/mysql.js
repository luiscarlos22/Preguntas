const mysql = require('mysql');

let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'db_preguntas'
});

conexion.connect((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Conexion exitosa a base de datos');
});

const ejecutarQuery = (query, callback) => {
    conexion.query(query, (err, result) => {
        if (err) {
            console.log('Error en el query');
            console.log(err);
            return callback(err);
        }
        callback(null, result);
    });
};

module.exports = {
    ejecutarQuery
}