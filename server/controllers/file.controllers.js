import {asyncWrapper} from "../utils/asyncWrapper.js"
import {ApiError} from "../utils/ApiError.js"
import {Response} from "../utils/Response.js"
import { User } from "../models/user.model.js";
import { TrezlFolder } from "../models/folder.model.js";
import { TrezlFile } from "../models/file.model.js";

export const createFile = asyncWrapper(async (req, res) => {
    const {fileName,folderId} = req.body
    if (!folderId) {
        throw new ApiError(404, "FolderId is required")
    }
    const userId = req.user._id
    if (!userId) {
        throw new ApiError(404, "User is not logged in")
    }
    const user = await User.findById(userId)
    if (!userId) {
        throw new ApiError(404, "User not found ")
    }
    const folder = await TrezlFolder.findOne({_id:folderId, userId})
    if (!folder) {
        throw new ApiError(404, "User is not owner of folder")
    }
    const uploadedFile = req.file
    if (!uploadedFile) {
        throw new ApiError(404, "File upload failed")
    } 
    // console.log("success")
    // res.send("success")
    const newFile = await TrezlFile.create({
        userId,
        fileUrl:uploadedFile.path,
        fileName:fileName,
        fileType:uploadedFile.mimetype,
        folderId:folderId
    });
    if (!newFile) {
        throw new ApiError(404, "File creation failed")
    }
    const updatedFolder = await TrezlFolder.findByIdAndUpdate(folderId,{
        $push:{files:newFile._id}
    })
    if (!updatedFolder) {
      throw new ApiError(404, "File creation failed")
    }
    res.status(201).json(
        new Response(201, {newFile}, "helllo ")
    )
})