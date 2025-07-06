import { Router } from "express";
import {createFile} from "../controllers/file.controllers.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"
const router = Router();
router.use(verifyJwt);

router.route('/create').post(upload.single("doc"), createFile)

export default router