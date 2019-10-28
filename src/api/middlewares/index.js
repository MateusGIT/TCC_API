const express = require('express');
const router = express.Router();
const company = require('./company.middleware');


router.get('/company/:name/', company.get);

module.exports = router;