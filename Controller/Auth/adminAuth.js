const { Validator } = require('node-input-validator');
const { errorCode } = require('../../Services/responseCode');
const { InputError } = require('../../Services/errorHandler');
const sequelize = require('../../db');
const adminUserSchema = require('../../Model/AdminUser');

const createUser = async (req, res) => {
    try {
        await sequelize.sync();
        const v = new Validator(req.body, {
            usr_email: 'required',
            usr_pass: 'required',
            usr_role: 'required'
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
        await adminUserSchema.create(DataSet)
            .then((data) => {
                res.status(errorCode.success).json({
                    status: true,
                    message: 'Added user successfully !'
                })

            }).catch((error) => {
                console.log("error", error)
                res.status(errorCode.serverError).json({
                    status: false,
                    message: 'Server error !!'
                })
            })

    } catch (error) {
        console.log("errorBal", error)
    }

}

const login = async (req, res) => {
    console.log("req.body", req.body)
    await adminUserSchema.findOne({
        where: { usr_email: req.body.usr_email, usr_pass: req.body.usr_pass },
        attributes: ['usr_email', 'usr_role', 'usr_name']
    })
        .then((data) => {
            console.log("logined")
            req.session.user = data
            // res.status(errorCode.success).json({
            //     status: true,
            //     message: 'Data get successfully !!',
            //     data
            // })
            res.render('pages/dashboard', {
                status: true,
                message: 'Data get successfully !!',
                data
            });

        }).catch((error) => {
            console.log("error", error)
            res.status(errorCode.serverError).json({
                status: false,
                message: "Server error ! Data not found !",
            })
        })
}

module.exports = {
    createUser,
    login
}