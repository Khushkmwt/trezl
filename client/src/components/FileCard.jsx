// components/FileCard.jsx
import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  File,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

export default function FileCard({ file }) {
  const [showMenu, setShowMenu] = useState(false);

  const getIcon = () => {
    const mime = file?.fileType?.toLowerCase();

    if (!mime) return <File size={26} className="text-gray-400" />;

    if (mime.startsWith("image/"))
      return <FileImage size={26} className="text-pink-400" />;

    if (mime.startsWith("video/"))
      return <FileVideo size={26} className="text-purple-400" />;

    if (mime.startsWith("audio/"))
      return <FileAudio size={26} className="text-indigo-400" />;

    if (mime === "application/pdf")
      return <FileText size={26} className="text-red-400" />;

    if (
      [
        "application/javascript",
        "application/x-javascript",
        "text/javascript",
        "text/typescript",
        "application/json",
        "text/html",
        "text/css",
        "text/x-python",
        "text/x-java-source",
        "text/x-c++src",
        "application/xml",
      ].includes(mime)
    )
      return <FileCode size={26} className="text-green-400" />;

    return <File size={26} className="text-gray-300" />;
  };

  const getExtensionFromMime = (mime) => {
    if (!mime || !mime.includes("/")) return "";
    const ext = mime.split("/")[1];
    return ext.includes(".") ? ext.split(".").pop() : ext;
  };

  const handleOptionClick = (action) => {
    setShowMenu(false);
    alert(`${action} clicked on ${file.fileName}`);
    // Replace this with actual logic
  };

  return (
    <div className="relative group flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-xl transition-all duration-200">
      {/* Ellipsis menu button */}
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="text-gray-300 hover:text-white p-1 rounded-full focus:outline-none"
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown options */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 text-sm text-gray-700">
            <button
              onClick={() => handleOptionClick("Download")}
              className="w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Download
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

      {/* File icon */}
      {getIcon()}

      {/* File name display */}
      <span className="mt-2 text-sm text-center break-words">
        {file?.fileName}.{getExtensionFromMime(file?.fileType)}
      </span>
    </div>
  );
}
