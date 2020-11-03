const express = require('express');
const router = express.Router();

const { linksController } = require('../controller');

// * GET /links
router.get('/', linksController.get);

// * POST /links
router.post('/', linksController.post);

module.exports = router;
