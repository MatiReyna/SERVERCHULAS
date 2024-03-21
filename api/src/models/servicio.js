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
            unique: true
        },
        price: {
            type: DataTypes.BIGINT,  // Permites números enteros entre -9,435,465,567,345,789,765 y 9,352,453,567,234,435,898.
            allowNull: false
        }
    }, { timestamps: false })
};