const { DataTypes } = require('sequelize');
const sequelize = require('./../../db');

const ProcessSchema = sequelize.define('clap_real_process', {
    having_uniquefield: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    unq_fld_id_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    parent_id: {
        type: DataTypes.BIGINT
    },
    parent_process_id: {
        type: DataTypes.BIGINT
    },
    org_id: {
        type: DataTypes.BIGINT
    },
    comp_id: {
        type: DataTypes.BIGINT
    },
    process_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    process_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    observer_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    instructional_video: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    process_attachment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_split: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    conditional_step: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    multi_thread_process: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    multithread_identifier: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    customdateinit_firststep: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    customdateinit_firststep_label: {
        type: DataTypes.TEXT,
        allowNull: true
    }

},
    {
        tableName: 'clap_real_process',
    })

module.exports = ProcessSchema;