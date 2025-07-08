import {Router} from "express"
import { changeFolderName, createFolder, deleteFolder, getFolder, shareFolder } from "../controllers/folder.controllers.js"
import {verifyJwt} from '../middlewares/auth.middleware.js'

const router = Router()
router.use(verifyJwt)

router.route("/:folderId").get(getFolder)
router.route("/create").post(createFolder)
router.route("/:folderId").delete(deleteFolder)
router.route("/:folderId").patch(changeFolderName)
router.route("/share/:folderId").post(shareFolder)

export default  router