import {asyncWrapper} from "../utils/asyncWrapper.js"
import {ApiError} from "../utils/ApiError.js"
import {Response} from "../utils/Response.js"
import { User } from "../models/user.model.js";
import { TrezlFolder } from "../models/folder.model.js";
import { TrezlFile } from "../models/file.model.js";

const deleteFolderDeep = async (folderId,userId) => {
  if (!folderId) {
    throw new ApiError(400, "FolderId is required")
  }
   await TrezlFile.deleteMany({userId,folderId})
   const folders = await TrezlFolder.find({userId, parentFolder:folderId})
   for(const folder of folders){
     await deleteFolderDeep(folder._id,userId);
   }
   
   await TrezlFolder.findByIdAndDelete(folderId)
}
// Create folder at root or whithin folder 
export const createFolder = asyncWrapper(async (req, res) => {
  const { foldername, parentFolder } = req.body;
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(404, "User not logged in");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const folder = new TrezlFolder({
    folderName: foldername || "Untitled",
    userId,
    parentFolder: parentFolder || null,
  });

  if (parentFolder) {
    const parent = await TrezlFolder.findById(parentFolder);
    if (!parent) {
      throw new ApiError(404, "Parent folder does not exist");
    }

    parent.subFolders.push(folder._id);
    await parent.save();
  }

  await folder.save();

  res.status(201).json(
    new Response(201, folder, "Folder created successfully")
  );
});

// Update folder name 
export const changeFolderName = asyncWrapper(async (req, res) => {
    const {foldername} = req.body
    const {folderId} = req.params
    const userId = req.user._id

    if (!folderId) {
        throw new ApiError(404, "Folder id is required");  
    }

    if (!foldername) {
        throw new ApiError(404, "Folder name is required");  
    }

    if (!userId) {
      throw new ApiError(404, "User not logged in");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const folder = await TrezlFolder.findOneAndUpdate(
        { _id : folderId , userId },
        { $set : { folderName : foldername } },
        { new : true }
    )

    if (!folder) {
        throw new ApiError(404, "Folder name updation failed")
    }

    res.status(200).json(
        new Response(200, folder, "Folder name updated successfully")
    )
})

// delete folder 

export const deleteFolder = asyncWrapper(async (req, res) => {
    const { folderId } = req.params
    const  userId = req.user._id
    
    if (!folderId) {
      throw new ApiError(404, "Folder id is required");  
    }
    if (!userId) {
      throw new ApiError(404, "User not logged in");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
   
    const folder = await TrezlFolder.findById(folderId)
    if (!folder) {
      throw new ApiError(404, "Folder does not exist");
    }
    
   try {
     await deleteFolderDeep(folderId, userId)
   } catch (error) {
     throw new ApiError(500, "deletion failed")
   }

    res.status(200).json(
        new Response(200, folder, "Folder deleted successfully")
    )
})

export const getFolder = asyncWrapper(async(req, res) => {
  const {folderId} = req.params
  if (!folderId) {
    throw new ApiError(400, "FolderId is required")
  }
  const userId = req.user;
  if (!userId) {
    throw new ApiError(400, "userId is required")
  }
  const parentFolder = folderId === 'root' ? null : folderId;
  const folders = await TrezlFolder.find({userId,parentFolder})
  let files = []
  if (parentFolder) {
     const folderDoc = await TrezlFolder.findOne({ _id: parentFolder, userId })
     .populate('files'); // populate the file references with actual docs
     files = folderDoc?.files || [];
    //  console.log(files);
   }

  
  res.status(201).json(
    new Response(
      201, {folders, files:files||[]} , "folder data retrieved"
    )
  )
})

export const shareFolder = asyncWrapper(async (req, res) => {
  const { users } = req.body;
  const { folderId } = req.params;
  const userId = req.user?._id;

  if (!folderId) throw new ApiError(400, "Folder ID is required");
  if (!Array.isArray(users) || users.length === 0) {
    throw new ApiError(400, "At least one user must be provided");
  }

  // ✅ Fetch folder owned by current user
  const folder = await TrezlFolder.findOne({ _id: folderId, userId });
  if (!folder) throw new ApiError(404, "Folder not found");

  // ✅ Validate user IDs
  const userIds = users.map((u) => u.userId);
  const validUsers = await User.find({ _id: { $in: userIds } });

  const validUserSet = new Set(validUsers.map((u) => u._id.toString()));

  // ✅ Filter valid & non-duplicate users
  const existingSharedIds = new Set(
    (folder.sharedWith || []).map((entry) => entry.userId.toString())
  );

  const newSharedUsers = users
    .filter(
      (u) =>
        validUserSet.has(u.userId.toString()) &&
        !existingSharedIds.has(u.userId.toString())
    )
    .map((u) => ({
      userId: u.userId,
      permission: u.permission || "view",
    }));

  if (newSharedUsers.length === 0) {
    throw new ApiError(400, "No new valid users to share with");
  }

  // ✅ Push non-duplicate entries
  folder.sharedWith.push(...newSharedUsers);
  await folder.save();

  res
    .status(201)
    .json(new Response(201, folder, "Folder shared successfully"));
});
