const { errorCode } = require('../../../Services/responseCode');
const { InputError } = require('../../../Services/errorHandler');
const oneTimeTaskSchema = require("./../../../Model/Task/oneTimeTask");
const UserAdminSchema = require('../../../Model/AdminUser')
const sequelize = require('../../../db');
const { Op } = require('sequelize');

const getOneTimeTask = async (req, res) => {
    oneTimeTaskSchema.belongsTo(UserAdminSchema, { foreignKey: 'doerid', as: 'doer' });
    oneTimeTaskSchema.belongsTo(UserAdminSchema, { foreignKey: 'created_by', as: 'AssignTo' });

    const toDate = req.body.toDate ? new Date(req.body.toDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const fromDate = req.body.fromDate ? new Date(req.body.fromDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const dashTashStatus = req.body.dashTashStatus ? req.body.dashTashStatus : 0
    const whereClause = {};
    if (req.body.toDate && req.body.fromDate) {
        whereClause.start_date = {
            [Op.between]: [fromDate, toDate],
        };
    } else if (req.body.toDate) {
        whereClause.start_date = {
            [Op.gte]: fromDate,
        };
    } else if (req.body.fromDate) {
        whereClause.start_date = {
            [Op.lte]: toDate,
        };
    }

    if (req.body.dashTashStatus) {
        whereClause.is_done = dashTashStatus;
    }

    await oneTimeTaskSchema.findAll({
        order: [['id', 'DESC']],
        attributes: ['dele_name', 'start_date', 'task_prior', 'is_done'],
        where: whereClause,
        include: [{
            model: UserAdminSchema,
            attributes: ['usr_name', 'usr_email', 'usr_role'],
            as: 'doer'
        },
        {
            model: UserAdminSchema,
            attributes: ['usr_name', 'usr_email', 'usr_role'],
            as: 'AssignTo'
        }]
    })
        .then((data) => {
            res.status(errorCode.success).json({
                status: true,
                message: 'Data get successfully !!',
                data
            })
        }).catch((error) => {
            console.log("error", error)
            res.status(errorCode.serverError).json({
                status: false,
                message: "Server error ! Data not found !",
            })
        })
}

const viewOneTimeTaskSingle = async (req, res) => {
    await oneTimeTaskSchema.findOne({
        where: { id: req.params.id },
        order: [['id', 'DESC']],
        attributes: { exclude: ['updatedAt'] }
    })
        .then(async (data) => {
            oneTimeTaskSchema.belongsTo(UserAdminSchema, { foreignKey: 'doerid', as: 'doer' });
            const TaskData = await oneTimeTaskSchema.findAll({
                where: { is_onetime: 0, isofonetime: req.params.id },
                order: [['id', 'DESC']],
                attributes: ['dele_name', 'doerid', 'comment', 'donetime'],
                include: [{
                    model: UserAdminSchema,
                    attributes: ['usr_name', 'usr_email', 'usr_role'],
                    as: 'doer'
                }]
            })
            data = { ...data.dataValues, checkList: TaskData }
            res.status(errorCode.success).json({
                status: true,
                message: 'Data get successfully !!',
                data
            })
        }).catch((error) => {
            console.log("error", error)
            res.status(errorCode.serverError).json({
                status: false,
                message: "Server error ! Data not found !",
            })
        })
}

module.exports = {
    getOneTimeTask,
    viewOneTimeTaskSingle
}