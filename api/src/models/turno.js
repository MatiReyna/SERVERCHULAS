const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('turno', {
        day: {
            type: DataTypes.DATEONLY,  // Este es solo para almacener la fecha en la base de datos.
            allowNull: false
        },
        timetable: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/  // Validación del formato hora HH:MM.
            }
        },
        states: {
            type: DataTypes.ENUM('LIBRE', 'PENDING', 'RESERVADO'),
            defaultValue: 'LIBRE',
            allowNull: false
        }
    }, { timestamps: false })
}; 