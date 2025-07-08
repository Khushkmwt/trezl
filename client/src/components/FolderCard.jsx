import { Folder, MoreVertical } from "lucide-react";
import { useState } from "react";
import useFileStore from "../store/fileStore";
import RenamePopup from "./RenamePopup";
import {ShareComponent} from "./ShareComponent"; // ⬅️ Import ShareComponent
import useUserStore from "../store/userStore"; // optional store for fetching users

export default function FolderCard({ folder, onOpen }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const { deleteFolder, renameFolder, shareFolder } = useFileStore();
  const { userList, searchUsers } = useUserStore(); // you might already have this

  const handleOptionClick = async (action) => {
    setShowMenu(false);
    if (action === "Delete") {
      await deleteFolder(folder._id);
    } else if (action === "Rename") {
      setShowRenamePopup(true);
    } else if (action === "Share") {
      setShowSharePopup(true);
    }
  };

  const handleRename = async (newName) => {
    if (newName !== folder.folderName) {
      await renameFolder(folder._id, newName);
    }
    setShowRenamePopup(false);
  };

  // 👇 Share handler function
  const handleShareUsers = async (folderId,users) => {
    await shareFolder(folderId, users); // calls API through your store
    setShowSharePopup(false);
  };

  const handleSearchUsers = async (query) => {
    await searchUsers(query); // updates `userList`
  };

  return (
    <>
      <div
        onDoubleClick={() => onOpen(folder._id, folder.folderName)}
        className="relative flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-xl transition-all duration-200 cursor-pointer"
      >
        {/* Ellipsis menu */}
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            className="text-gray-300 hover:text-white p-1 rounded-full focus:outline-none"
          >
            <MoreVertical size={18} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 text-sm text-gray-700">
              <button
                onClick={() => handleOptionClick("Share")}
                className="w-full px-4 py-2 hover:bg-gray-100 text-left"
              >
                Share Folder
              </button>
              <button
                onClick={() => handleOptionClick("Rename")}
                className="w-full px-4 py-2 hover:bg-gray-100 text-left"
              >
                Rename
              </button>
              <button
                onClick={() => handleOptionClick("Delete")}
                className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Folder Icon */}
        <Folder size={28} className="text-blue-400" />
        <span className="mt-2 text-sm text-center break-words">
          {folder.folderName}
        </span>
      </div>

      {/* Rename Popup */}
      {showRenamePopup && (
        <RenamePopup
          defaultValue={folder.folderName}
          onCancel={() => setShowRenamePopup(false)}
          onConfirm={handleRename}
        />
      )}

      {/* Share Popup */}
      {showSharePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-lg relative">
            <ShareComponent
              data={userList} // user data list
              refresh={handleSearchUsers} // search logic
              onShare={handleShareUsers} // API call
              resourceId={folder._id}
            />
            <button
              onClick={() => setShowSharePopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
