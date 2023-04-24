const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
        public_id: (req, file) => {
            const originalname = file.originalname.split('.')
            return `image-${Date.now()}-${originalname[0]}`
        }
    }
});


module.exports = {
    uploadImageMulti: multer({ storage: storage }).array('image', 5)
}