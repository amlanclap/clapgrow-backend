const express = require("express");
const { createUser, login } = require("../../Controller/Auth/adminAuth");
const { route } = require("./admin");
const router = express.Router();


// auth admin 
router.post('/admin/register', createUser)

// router.get('/admin/login', function (res) { res.render('/Pages/login') })
router.get('/admin/login', function (req, res, next) {
    res.render('Pages/login', { title: 'Express' });
});
router.get('/admin/dashboard', function (req, res, next) {
    res.render('Pages/dashboard', { title: 'Express' });
});
router.post('/admin/login', login)
router.use('/admin', require('./admin'))
router.use('/doer', require('./doer'))

module.exports = router;