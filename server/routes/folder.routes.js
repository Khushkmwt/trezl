import {Router} from "express"
import { createFolder, getFolder } from "../controllers/folder.controllers.js"
import {verifyJwt} from '../middlewares/auth.middleware.js'

const router = Router()
router.use(verifyJwt)

router.route("/:folderId").get(getFolder)
router.route("/create").post(createFolder)

export default  router