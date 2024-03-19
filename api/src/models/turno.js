const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('turno', {
        day: {
            type: DataTypes.DATE,
            allowNull: false
        },
        timetable: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
};