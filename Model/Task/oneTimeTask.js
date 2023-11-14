const { DataTypes } = require('sequelize');
const sequelize = require('./../../db');

const oneTimeTask = sequelize.define('oneTimeTask', {
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    doerID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dueTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    restrictedOnDate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }, // Restrict user to mark as done after or before due date ?
    restrictedFileUpload: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    } // File upload id required during mark as done
})

module.exports = oneTimeTask;