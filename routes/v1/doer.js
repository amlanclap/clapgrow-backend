const express = require("express");
const { getOneTimeTask, viewOneTimeTaskSingle } = require("../../Controller/Admin/doer/oneTimeTask");
const router = express.Router();


router.post('/one-time-task', getOneTimeTask)
router.get('/view-single-onetime-task/:id', viewOneTimeTaskSingle)

module.exports = router;