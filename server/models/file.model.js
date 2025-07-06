import mongoose from "mongoose";
import { User } from "./user.model.js";
import { TrezlFolder } from "./folder.model.js";

const fileSchema = new mongoose.Schema({
  userId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true,
  },
  fileName : {
    type : String,
    required : true,
    trim : true,
    index : true,
  },
  accessType : {
    type : String,
    required: true,
    enum :["private", "public", "shared"],
    default : "private"
  },
  fileUrl : {
    type : String,
    required : true
  },
  fileType : {
    type : String ,
    required : true
  },
  sharedWith : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  }],
  folderId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "TrezlFolder",
    required:true,
  },
},{timestamps:true});

fileSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.accessType && update.accessType !== "shared") {
    update.sharedWith = [];
    this.setUpdate(update);
  }

  next();
});

export const TrezlFile = mongoose.model("TrezlFile", fileSchema)