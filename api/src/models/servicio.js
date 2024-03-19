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
            type: DataTypes.DECIMAL(3,2),
            allowNull: false
        }
    }, { timestamps: false })
};