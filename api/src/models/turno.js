const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('turno', {
        day: {
            type: DataTypes.DATEONLY,  // Este es solo para almacener la fecha en la base de datos.
            allowNull: false,
            validate: {
                isDate: true,  // Verifica que la fecha tenga el formato correcto.
            }
        },
        timetable: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                is: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,  // Validación del formato hora HH:MM.
                isValidTime(value) {  // Verifica que el horario este dentro de un rango válido (00:00 a 23:59).
                    const [ hour, minute ] = value.split(':');
                    if ((parseInt(hour) < 0 || parseInt(hour) > 23 || parseInt(minute) < 0) || parseInt(minute) > 59) {
                        throw Error('Invalid time')
                    }
                }
            }
        },
        states: {
            type: DataTypes.ENUM('LIBRE', 'PENDING', 'RESERVADO'),
            defaultValue: 'LIBRE',
            allowNull: false
        }
    }, { timestamps: false })
}; 