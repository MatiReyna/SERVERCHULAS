const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('servicio', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {  // Validamos la longitud mínima y máxima del nombre del servicio.
                len: [1, 70]
            }
        },
        price: {
            type: DataTypes.BIGINT,  // Permites números enteros entre -9,435,465,567,345,789,765 y 9,352,453,567,234,435,898.
            allowNull: false,
            validate: {  // Validación personalizada para asegurar que el precio sea positivo.
                isPositive(value) {
                    if (value < 0) {
                        throw error('El precio debe ser un número positivo')
                    }
                }
            }
        }
    }, { timestamps: false })
};