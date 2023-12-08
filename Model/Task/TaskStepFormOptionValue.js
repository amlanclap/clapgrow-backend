const { DataTypes } = require('sequelize');
const sequelize = require('./../../db');

const taskStepFormOptionSchema = sequelize.define('teskStepOption', {
    processID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    StepID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    formID: {
        type: DataTypes.INTEGER
    },
    optionValue: {
        type: DataTypes.STRING,
        allowNull: true
    },
    OptionName: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = taskStepFormOptionSchema;