const router = require("express").Router();
const qrcode = require("../controllers/qrcode");
const { getQrCode, getQrCodes, addQrCode, updateQrCode, deleteQrCode } = require('../controllers/qrcode')

router.route('/')
    .get(getQrCodes)
    .post(addQrCode)

router.route('/:qrcodeId')
    .get(getQrCode)
    .put(updateQrCode)
    .delete(deleteQrCode)

module.exports = router