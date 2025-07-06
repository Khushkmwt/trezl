import mongoose from "mongoose";
import { User } from "./user.model.js";
import { TrezlFile } from "./file.model.js";

const folderSchema = new mongoose.Schema({
  folderName:{
    type: String,
    required: true,
    default : "Untitled"
  },
  subFolders:[{
    type : mongoose.Schema.Types.ObjectId,
    ref: "TrezlFolder",
  }],
  parentFolder : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "TrezlFolder",
    default : null,
  },
  accessType : {
    type : String,
    required: true,
    enum :["private", "public", "shared"],
    default : "private",
  },
  userId: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true,
  },
  files:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"TrezlFile",
  }],
  sharedWith : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }]
},{timestamps:true});

folderSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    if (update.accessType && update.accessType !== "shared" ) {
        update.sharedWith = [];
        this.setUpdate(update);
    }
    next();
})


export const TrezlFolder = mongoose.model("TrezlFolder", folderSchema);