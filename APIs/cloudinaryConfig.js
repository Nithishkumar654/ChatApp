const cloudinary = require('cloudinary').v2;
const multer = require('multer')

const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: "dwl3dxfac",
    api_key: "427637792871644",
    api_secret: "yZl92vIRYLgYsfwUNVGgiRp5ml8"
})

let clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chatfiles',
        public_id: (req, file) => file.fieldname + "-" + Date.now()
    }
})

let multerObj = multer({storage: clStorage})

module.exports = multerObj