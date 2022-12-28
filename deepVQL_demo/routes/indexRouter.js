const express = require('express');
const router = express.Router();

const controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', controller.index);

router.get('/demo', controller.demo);


module.exports = router;
