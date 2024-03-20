require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const ServicioModel = require('./models/servicio');
const TurnoModel = require('./models/turno');
const UserModel = require('./models/user');

const sequelize = new Sequelize(  // Conexión a la base de datos PostgreSQL.
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    { logging: false, native: false }
);

// Ejecutamos la función de los modelos, y le pasamos a sequelize.
ServicioModel(sequelize);
TurnoModel(sequelize);
UserModel(sequelize);

// ¡Relaciones de los modelos!
const { servicio, turno, user } = sequelize.models;

user.hasMany(turno)  // Un usuario puede tener varios turnos.
turno.belongsTo(user)  // Un turno pertenece a un solo usuario.

servicio.hasMany(turno)  // Un servicio puede estar en varios turnos.
turno.belongsTo(servicio)  // Un turno puede tener solo un servicio.

module.exports = {
    servicio,
    turno,
    user,
    conn: sequelize
}