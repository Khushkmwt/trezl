import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import {CloudinaryStorage} from "multer-storage-cloudinary"

const storage = new CloudinaryStorage({
    cloudinary , 
    params : {
        folder: 'trezl_files',
        allowed_formats: ['jpg', 'png', 'pdf', 'docx'],
        resource_type: 'auto',
    }
})

const upload = multer({storage})

export default upload