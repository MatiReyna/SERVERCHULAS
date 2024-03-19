const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                isEmail: true
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activeLogin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        level: {
            type: DataTypes.ENUM('STANDAR', 'ADMIN'),
            defaultValue: 'STANDAR',
        }
    }, { timestamps: false })
};