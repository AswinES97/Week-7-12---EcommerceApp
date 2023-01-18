const multer = require('multer')
const path = require('path')
const util = require('util')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/img/product')
    },
    filename: (req, file, cb) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})


module.exports = {
    uploadImageMulti:multer({storage:storage}).array('image',3)
}