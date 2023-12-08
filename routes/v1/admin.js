const express = require("express");
const { createOneTimeTask, getOneTimeTask, getSingleOneTimeTask } = require("../../Controller/Admin/Task/oneTimeTask");
const { createProcess, createTaskForm, getProcess, singleProcess, getAttachForm } = require("../../Controller/Admin/Task/Process");
const router = express.Router();

// one time task 
router.post('/task', createOneTimeTask)
router.get('/task', getOneTimeTask)
router.get('/task/single/:id', getSingleOneTimeTask)


// process 
router.post('/process', createProcess)
router.post('/attach-form', createTaskForm)
router.get('/process', getProcess)
router.get('/process/single/:id', singleProcess)
router.get('/process/attach-form/:processID/:StepID', getAttachForm)

// process view 
router.get('/newTask', function (req, res, next) {
    res.render('Pages/task/newTask');
});
router.get('/AddProcess', function (req, res, next) {
    res.render('Pages/task/process/addProcess');
});
module.exports = router;