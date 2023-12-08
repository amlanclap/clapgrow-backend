const { DataTypes } = require('sequelize');
const sequelize = require('./../db');

const adminUserSchema = sequelize.define('clap_admin_users', {
    usr_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    usr_email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    usr_designation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_ctc: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_cost_perhour: {
        type: DataTypes.STRING,
        allowNull: true
    },
    usr_pass: {
        type: DataTypes.STRING,
        allowNull: true
    },
    usr_mob: {
        type: DataTypes.STRING,
        allowNull: true
    },
    usr_role: {
        type: DataTypes.INTEGER
    },
    user_org: {
        type: DataTypes.BIGINT
    },
    usr_comp: {
        type: DataTypes.INTEGER
    },
    comp_branch: {
        type: DataTypes.BIGINT
    },
    comp_dept: {
        type: DataTypes.BIGINT
    },
    comp_role: {
        type: DataTypes.BIGINT
    },
    prof_pic: {
        type: DataTypes.TEXT
    },
    can_assign_task: {
        type: DataTypes.BOOLEAN
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_by: {
        type: DataTypes.INTEGER
    },
    updated_at: {
        type: DataTypes.DATE
    },
    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    reg_on: {
        type: DataTypes.DATE
    },
    is_pc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    em_acc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        tableName: 'clap_admin_users'
    }

)

module.exports = adminUserSchema;