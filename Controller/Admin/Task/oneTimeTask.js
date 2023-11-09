const { Validator } = require('node-input-validator');
const { errorCode } = require('../../../Services/responseCode');
const { InputError } = require('../../../Services/errorHandler');
const oneTimeTaskSchema = require("./../../../Model/Task/oneTimeTask");
const sequelize = require('../../../db');

const createOneTimeTask = async (req, res) => {
    await sequelize.sync();
    const v = new Validator(req.body, {
        taskName: 'required',
        doerID: 'required',
        dueDate: 'required',
        dueTime: 'required',
        tags: 'required',
        description: 'required'

    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res
            .status(errorCode.dataNotmatch)
            .send({ status: false, error: v.errors, message: InputError(v.errors) });
    }

    var DataSet = {
        ...req.body
    }
    console.log("DataSet", DataSet)

    await oneTimeTaskSchema.create(DataSet)
        .then((data) => {
            res.status(errorCode.success).json({
                status: true,
                message: "Data added successfully !",
                data: data
            })
        }).catch((err) => {
            console.log(err)
            res.status(errorCode.serverError).json({
                status: false,
                message: "Server error ! Data not found !",
            })
        })
}

const getOneTimeTask = async (req, res) => {
    await oneTimeTaskSchema.findAll({
        order: [['id', 'DESC']],
        attributes: { exclude: ['updatedAt'] }
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

module.exports = {
    createOneTimeTask,
    getOneTimeTask
}