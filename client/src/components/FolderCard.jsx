// components/FolderCard.jsx
import { Folder, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function FolderCard({ folder, onOpen }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleOptionClick = (action) => {
    setShowMenu(false);
    alert(`${action} clicked on folder: ${folder.folderName}`);
    // Replace with real logic as needed
  };

  return (
    <div
      onDoubleClick={() => onOpen(folder._id, folder.folderName)}
      className="relative flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-xl transition-all duration-200 cursor-pointer"
    >
      {/* Ellipsis menu button */}
      <div className="absolute top-2 right-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering onDoubleClick
            setShowMenu((prev) => !prev);
          }}
          className="text-gray-300 hover:text-white p-1 rounded-full focus:outline-none"
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown options */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 text-sm text-gray-700">
            <button
              onClick={() => handleOptionClick("Open")}
              className="w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Open
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

      {/* Folder Name */}
      <span className="mt-2 text-sm text-center break-words">
        {folder.folderName}
      </span>
    </div>
  );
}
