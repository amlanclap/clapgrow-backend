const { DataTypes } = require('sequelize');
const sequelize = require('./../../db');

const oneTimeTask = sequelize.define('clap_delegates_list', {
    org_id: {
        type: DataTypes.BIGINT
    },
    comp_id: {
        type: DataTypes.INTEGER
    },
    dele_name: {
        type: DataTypes.STRING,
    },
    doerid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    donetime: {
        type: DataTypes.DATE
    },
    uploaded_file: {
        type: DataTypes.TEXT
    },
    comment: {
        type: DataTypes.TEXT
    },
    selfjob: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_on: {
        type: DataTypes.DATE
    },
    is_app: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    restricted_ondate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    file_upload_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    task_prior: {
        type: DataTypes.INTEGER,
        defaultValue: true
    },
    task_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isofonetime: {
        type: DataTypes.BIGINT
    },
    is_onetime: {
        type: DataTypes.INTEGER
    },
    // tags: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
},
    {
        tableName: 'clap_delegates_list'
    }
)

module.exports = oneTimeTask;