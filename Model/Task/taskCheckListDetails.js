const { DataTypes } = require('sequelize');
const sequelize = require('./../../db');

const checkListDetailsSchema = sequelize.define('checklistDetails', {
    processID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    StepID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    checklistName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    checklistDoerID: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = checkListDetailsSchema;