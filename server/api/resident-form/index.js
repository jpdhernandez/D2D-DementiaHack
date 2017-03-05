'use strict';

var express = require('express');
var controller = require('./resident-form.controller');

var router = express.Router();

router.get('/:userId', controller.show);
router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:userId', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
