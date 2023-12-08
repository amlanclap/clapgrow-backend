const { Validator } = require('node-input-validator');
const { errorCode } = require('../../../Services/responseCode');
const { InputError } = require('../../../Services/errorHandler');
const sequelize = require('../../../db');
const ProcessSchema = require('../../../Model/Task/Process');
const TaskStepSchema = require('../../../Model/Task/TaskStep');
const checkListDetailsSchema = require('../../../Model/Task/taskCheckListDetails');
const TaskStepFormsSchema = require('../../../Model/Task/TaskStepFroms');
const taskStepFormOptionSchema = require('../../../Model/Task/TaskStepFormOptionValue');

const createProcess = async (req, res) => {
    await sequelize.sync();
    console.log("req.body.ddd", req.body)

    const v = new Validator(req.body, {
        process_name: 'required',
        process_desc: 'required',
        observer_id: 'required'
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

    let stepArray = []
    // console.log("req.body.step_name", typeof (req.body.step_name))
    for (let index = 0; index < req.body.step_name.length; index++) {
        // const element = req.body.step_name[index + 1];
        // console.log("elementsAmlan", index, element)
        let stepObject = {}
        if (index == 0) {
            stepObject = {
                step_name: req.body.step_name[index],
                step_description: req.body.step_description[index],
                step_doer: req.body.step_doer[index],
                // file_upload_needed: req.body.file_upload_needed[index] ? req.body.file_upload_needed[index] : '',
                // variable_starts: req.body.step_tat[variable_starts] ? req.body.step_tat[variable_starts] : '',
                // variable_step_fieldnm: req.body.step_tat[variable_step_fieldnm] ? req.body.step_tat[variable_step_fieldnm] : ''
            }
        } else {
            stepObject = {
                step_name: req.body.step_name[index],
                step_description: req.body.step_description[index],
                step_doer: req.body.step_doer[index],
                step_type: req.body.step_type[index - 1],
                step_tat: req.body.step_tat[index - 1],
                frequency: req.body.frequency[index - 1],
                // file_upload_needed: req.body.file_upload_needed[index] ? req.body.file_upload_needed[index] : '',
                // variable_starts: req.body.step_tat[variable_starts] ? req.body.step_tat[variable_starts] : '',
                // variable_step_fieldnm: req.body.step_tat[variable_step_fieldnm] ? req.body.step_tat[variable_step_fieldnm] : ''
            }
        }

        console.log("stepObject", stepObject)
        // console.log("stepObjectAny", req.body.step_tat[Number(index)] + 1)

        stepArray.push(stepObject)
    }

    await ProcessSchema.create(DataSet)
        .then((data) => {
            stepArray.forEach(async element => {
                let stepDataset = {
                    process_id: data.id,
                    step_name: element.step_name,
                    step_description: element.step_description,
                    step_doer: element.step_doer,
                    step_type: element.step_type ? element.step_type : '',
                    step_tat: element.step_tat ? element.step_tat : 0,
                    frequency: element.frequency ? element.frequency : '',
                    // file_upload_needed: element.file_upload_needed,
                    // variable_starts: element.variable_starts,
                    // variable_step_fieldnm: element.variable_step_fieldnm ? element.variable_step_fieldnm : ''
                }
                await TaskStepSchema.create(stepDataset)
                // .then((step) => {
                //     if (typeof (element.checkList) != 'undefined') {
                //         element.checkList.forEach(async checklist => {
                //             let checklistDataset = {
                //                 processID: data.id,
                //                 StepID: step.id,
                //                 checklistName: checklist.checklistName,
                //                 checklistDoerID: checklist.checklistDoerID
                //             }
                //             await checkListDetailsSchema.create(checklistDataset)
                //         });
                //     }
                // }).catch((err) => {
                //     console.log("aaaaaa", err)
                // })
            });
            // res.status(errorCode.success).json({
            //     status: true,
            //     message: "Data added successfully !",
            // })
            res.redirect('/api/v1/admin/process');
        }).catch((err) => {
            console.log("aaaaaa", err)
            res.status(errorCode.serverError).json({
                status: false,
                message: "Server error ! Data not found !",
            })
        })
}

const createTaskForm = async (req, res) => {
    await sequelize.sync();
    const v = new Validator(req.body, {
        fld_type: 'required',
        fld_label: 'required'
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
    await TaskStepFormsSchema.create(DataSet)
        .then((data) => {
            // if (req.body.optionValueName) {
            //     req.body.optionValueName.forEach(async element => {
            //         let optionValueDataset = {
            //             processID: req.body.processID,
            //             StepID: req.body.StepID,
            //             formID: data.id,
            //             optionValue: element.optionValue,
            //             OptionName: element.OptionName
            //         }
            //         await taskStepFormOptionSchema.create(optionValueDataset)
            //     });
            // }

            res.status(errorCode.success).json({
                status: true,
                message: "Form added successfully !",
            })
        }).catch((error) => {
            console.log("error", error)
            res.status(errorCode.serverError).json({
                status: false,
                message: "Server error ! Data not found !",
            })
        })

}

const getProcess = async (req, res) => {
    await ProcessSchema.findAll({
        order: [['id', 'DESC']],
        attributes: { exclude: ['updatedAt', 'description', 'observerID'] }
    })
        .then((data) => {
            res.render('Pages/task/process/listProcess', { datap: data });
        }).catch((error) => {
            console.log("error", error)
            res.status(errorCode.serverError).json({
                status: false,
                message: "Server error ! Data not found !",
            })
        })
}

const singleProcess = async (req, res) => {
    ProcessSchema.hasMany(TaskStepSchema, { foreignKey: 'process_id', as: 'Steps' });
    TaskStepSchema.belongsTo(ProcessSchema, { foreignKey: 'id' });
    await ProcessSchema.findOne(
        {
            where: { id: req.params.id },
            attributes: { exclude: ['updatedAt', 'createdAt'] },
            include: [{
                model: TaskStepSchema,
                attributes: { exclude: ['updatedAt', 'createdAt'] },
                as: 'Steps'
            }]
        }
    ).then((data) => {
        res.status(errorCode.success).json({
            status: true,
            message: 'Data get successfully !!',
            data
        })
    }).catch((error) => {
        res.status(errorCode.serverError).json({
            status: false,
            message: "Server error ! Data not found !",
        })
    })
}

const getAttachForm = async (req, res) => {
    TaskStepFormsSchema.hasMany(teskStepOptions, { foreignKey: 'formID', as: 'StepFormOptionValue' });
    teskStepOptions.belongsTo(TaskStepFormsSchema, { foreignKey: 'id' });
    await TaskStepFormsSchema.findAll({
        where: { processID: req.params.processID, StepID: req.params.StepID },
        order: [['id', 'DESC']],
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: [{
            model: teskStepOptions,
            // attributes: { exclude: ['updatedAt', 'createdAt'] },
            as: 'StepFormOptionValue'
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

module.exports = {
    createProcess,
    createTaskForm,
    getProcess,
    singleProcess,
    getAttachForm
}
