const { DataTypes } = require('sequelize');
const sequelize = require('./../../db');

const TaskStepSchema = sequelize.define('real_process_step', {
    process_id: {
        type: DataTypes.BIGINT
    },
    step_id: {
        type: DataTypes.BIGINT,
    },
    comp_id: {
        type: DataTypes.BIGINT,
    },
    org_id: {
        type: DataTypes.BIGINT,
    },
    step_no: {
        type: DataTypes.INTEGER
    },
    step_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    step_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    step_doer: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    step_type: {
        type: DataTypes.INTEGER
        // 1--General, 2---day specific, 3---cut off
    },
    step_tat: {
        type: DataTypes.INTEGER
    },
    frequency: {
        type: DataTypes.INTEGER
        // 1---hourly , 2--day
    },
    cut_off: {
        type: DataTypes.TIME
    },
    split_start: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    split_process_id: {
        type: DataTypes.BIGINT
    },
    file_upload_needed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    variable_starts: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    variable_step_fieldnm: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    dependent_step: {
        type: DataTypes.INTEGER
    },
    onapproval: {
        type: DataTypes.INTEGER
    },
    onrejection: {
        type: DataTypes.INTEGER
    },
    wap_msg_tpl: {
        type: DataTypes.BIGINT
    }
},
    {
        tableName: 'real_process_step'
    }

)

module.exports = TaskStepSchema;