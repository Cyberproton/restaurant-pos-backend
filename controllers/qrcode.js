const QrCode = require('../models/QrCode')

const getQrCode = (req, res) => {
    const id = req.params.qrcodeId
    if (!id) {
        res.status(400).json({ error: 'No QR Code ID' })
        return
    }
    QrCode
        .findById(id)
        .exec()
        .then(qrcode => res.status(200).json({ qrcode: qrcode }))
        .catch(err => res.status(500).json({ error: err }))
}

const getQrCodes = (req, res) => {
    QrCode
        .find()
        .exec()
        .then(qrcodes => res.status(200).json({ qrcodes: qrcodes }))
        .catch(err => res.status(500).json({ error: err }))
}

const addQrCode = (req, res) => {
    const link = req.body.link
    if (!link) {
        res.status(400).json({ error: 'Link must not be null' })
        return
    }
    const qrcode = new QrCode(req.body)
    qrcode
        .save()
        .then(qrcode => res.status(200).json({ qrcode: qrcode }))
        .catch(err => res.status(500).json({ error: err }))
}

const updateQrCode = (req, res) => {
    const id = req.params.qrcodeId
    if (!id) {
        res.status(400).json({ error: 'No QR Code ID' })
        return
    }
    QrCode
        .findByIdAndUpdate(id, req.body)
        .exec()
        .then(qrcode => res.status(200).json({ qrcode: qrcode }))
        .catch(err => res.status(500).json({ error: err }))
}

const deleteQrCode = (req, res) => {
    const id = req.params.qrcodeId
    if (!id) {
        res.status(400).json({ error: 'No QR Code ID' })
        return
    }
    QrCode
        .findByIdAndRemove(id)
        .exec()
        .then(qrcode => res.status(200).json({ qrcode: qrcode }))
        .catch(err => res.status(500).json({ error: err }))
}

module.exports = { getQrCode: getQrCode, getQrCodes: getQrCodes, addQrCode: addQrCode, updateQrCode: updateQrCode, deleteQrCode: deleteQrCode }