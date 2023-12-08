const { Validator } = require('node-input-validator');
const { errorCode } = require('../../../Services/responseCode');
const { InputError } = require('../../../Services/errorHandler');
const oneTimeTaskSchema = require("./../../../Model/Task/oneTimeTask");
const UserAdminSchema = require('../../../Model/AdminUser')
const sequelize = require('../../../db');

const createOneTimeTask = async (req, res) => {
    await sequelize.sync();
    const v = new Validator(req.body, {
        dele_name: 'required',
        doerid: 'required',
        start_date: 'required',
        task_prior: 'required'

    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res
            .status(errorCode.dataNotmatch)
            .send({ status: false, error: v.errors, message: InputError(v.errors) });
    }
    var DataSet = {
        org_id: req.body.org_id ? req.body.org_id : '',
        comp_id: req.body.comp_id ? req.body.comp_id : '',
        dele_name: req.body.dele_name ? req.body.dele_name : '',
        doerid: req.body.doerid ? req.body.doerid : '',
        created_by: req.body.created_by ? req.body.created_by : '',
        start_date: req.body.start_date ? req.body.start_date : '',
        start_time: req.body.start_time,
        is_active: req.body.is_active,
        is_done: req.body.is_done,
        donetime: req.body.donetime,
        uploaded_file: req.body.uploaded_file ? req.body.uploaded_file : '',
        comment: req.body.comment ? req.body.comment : '',
        created_on: req.body.created_on ? req.body.created_on : '',
        restricted_ondate: req.body.restricted_ondate,
        file_upload_required: req.body.file_upload_required,
        task_prior: req.body.task_prior,
        task_desc: req.body.task_desc ? req.body.task_desc : '',
        isofonetime: 0,
        is_onetime: 0
    }

    if (typeof (req.body.task) != 'undefined') {
        DataSet = {
            ...DataSet,
            isofonetime: 0,
            is_onetime: 1
        }
    }
    await oneTimeTaskSchema.create(DataSet)
        .then((data) => {
            if (typeof (req.body.task) != 'undefined') {
                req.body.task.forEach(async element => {
                    console.log("element", element)
                    var oneTaskObj = {
                        org_id: req.body.org_id ? req.body.org_id : '',
                        comp_id: req.body.comp_id ? req.body.comp_id : '',
                        dele_name: element.taskName,
                        doerid: element.doerID,
                        created_by: req.body.created_by ? req.body.created_by : '',
                        start_date: req.body.start_date ? req.body.start_date : '',
                        start_time: req.body.start_time,
                        is_active: req.body.is_active,
                        is_done: req.body.is_done,
                        donetime: req.body.donetime,
                        uploaded_file: req.body.uploaded_file ? req.body.uploaded_file : '',
                        comment: req.body.comment ? req.body.comment : '',
                        created_on: req.body.created_on ? req.body.created_on : '',
                        restricted_ondate: req.body.restricted_ondate,
                        file_upload_required: req.body.file_upload_required,
                        task_prior: req.body.task_prior,
                        task_desc: req.body.task_desc ? req.body.task_desc : '',
                        isofonetime: data.id,
                        is_onetime: 0
                    }
                    await oneTimeTaskSchema.create(oneTaskObj)
                });
            }
            res.status(errorCode.success).json({
                status: true,
                message: "Data added successfully !",
                data: data
            })
        }).catch((err) => {
            console.log("logAmlan", err)
            res.status(errorCode.serverError).json({
                status: false,
                message: "Server error ! Data not found !",
            })
        })
}

const getOneTimeTask = async (req, res) => {
    oneTimeTaskSchema.belongsTo(UserAdminSchema, { foreignKey: 'doerid', as: 'user' });
    oneTimeTaskSchema.belongsTo(UserAdminSchema, { foreignKey: 'created_by', as: 'AssignTo' });
    await oneTimeTaskSchema.findAll({
        order: [['id', 'DESC']],
        attributes: { exclude: ['updatedAt'] },
        include: [{
            model: UserAdminSchema,
            attributes: ['usr_name', 'usr_email', 'usr_role'],
            as: 'user'
        },
        {
            model: UserAdminSchema,
            attributes: ['usr_name', 'usr_email', 'usr_role'],
            as: 'AssignTo'
        }
        ]
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

const getSingleOneTimeTask = async (req, res) => {
    // oneTimeTaskSchema.belongsTo(UserAdminSchema, { foreignKey: 'isofonetime', as: 'checkout' });
    // oneTimeTaskSchema.belongsTo(UserAdminSchema, { foreignKey: 'created_by', as: 'AssignTo' });
    await oneTimeTaskSchema.findOne({
        where: { id: req.params.id },
        order: [['id', 'DESC']],
        attributes: { exclude: ['updatedAt'] }

    })
        .then(async (data) => {
            const TaskData = await oneTimeTaskSchema.findAll({
                where: { is_onetime: 0, isofonetime: req.params.id },
                order: [['id', 'DESC']],
                attributes: ['dele_name', 'doerid']

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

// const undateOneTimeTask = async (req, res) => {
//     var DataSet = {
//         dele_name: req.body.dele_name,
//         doerid: req.body.doerid,
//         start_date: req.body.start_date,
//         start_time: req.body.start_time,
//         is_active: req.body.is_active,
//         is_done: req.body.is_done,
//         donetime: req.body.donetime,
//         uploaded_file: req.body.uploaded_file,
//         comment: req.body.comment,
//         created_on: req.body.created_on,
//         restricted_ondate: req.body.restricted_ondate,
//         file_upload_required: req.body.file_upload_required,
//         task_prior: req.body.task_prior,
//         task_desc: req.body.task_desc

//     }
// }

module.exports = {
    createOneTimeTask,
    getOneTimeTask,
    getSingleOneTimeTask
}