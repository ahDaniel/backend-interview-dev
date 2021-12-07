const express = require('express');
const imagesController = require('../../controllers/images.controller');

const router = express.Router();

router.get('/', imagesController.getImages);

module.exports = router;