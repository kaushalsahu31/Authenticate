const express = require('express');
const { upload, HandleRes } = require('../common/helper');
const router = express.Router();


router.use('/auth', require('./user'));
router.use('/contacts', require('./contact'));
router.use('/spam', require('./spam'));
router.use('/search', require('./search'));
router.post("/upload",upload.single("image"),async (req, res) => {return HandleRes(res,200,"uploaded successfully",req.file)})


module.exports = router;