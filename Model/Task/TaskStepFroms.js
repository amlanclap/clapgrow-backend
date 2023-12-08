const { DataTypes } = require('sequelize');
const sequelize = require('./../../db');

const TaskStepFormsSchema = sequelize.define('clap_dynamic_form', {
    sess_id: {
        type: DataTypes.STRING
    },
    fld_label: {
        type: DataTypes.STRING
    },
    process_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    StepID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fld_type: {
        type: DataTypes.INTEGER,
        // 1- Text , 2-Text Area, 3-Checkbox, 4-Radio, 5-Select, 7-Date , 8-Number
    },
    fld_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    auto_gen_id: {
        type: DataTypes.STRING
    },
    display_inline: {
        type: DataTypes.BOOLEAN
    },
    template_var_name: {
        type: DataTypes.STRING
    },
    master_table_id: {
        type: DataTypes.BIGINT
    },
    pull_wap_no: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        tableName: 'clap_dynamic_form'
    }
)

module.exports = TaskStepFormsSchema;