const express = require("express");
const { createOneTimeTask, getOneTimeTask } = require("../../Controller/Admin/Task/oneTimeTask");
const router = express.Router();

// one time task 
router.post('/task', createOneTimeTask)
router.get('/task', getOneTimeTask)

module.exports = router;