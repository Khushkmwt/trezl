import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import FolderCard from '../components/FolderCard';
import FileCard from '../components/FileCard';

import useFileStore from '../store/fileStore';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const {
    folders, files, path,
    fetchFolder, goToFolder, goBackTo, addFolder, addFile
  } = useFileStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const folderIdFromUrl = searchParams.get('folderId') || 'root';

  const [newFolderName, setNewFolderName] = useState('untitled');
  const [newFileName, setNewFileName] = useState('unnamedfile');

  useEffect(() => {
    fetchFolder(folderIdFromUrl);
  }, [folderIdFromUrl]);

  const handleOpenFolder = (id, name) => {
    setSearchParams({ folderId: id });
    goToFolder(id, name);
  };

  const handleNavigateBack = (index) => {
    const targetFolderId = path[index]?.id || 'root';
    setSearchParams({ folderId: targetFolderId });
    goBackTo(index);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col px-6 py-4">
        {/* Breadcrumb */}
        <Breadcrumb path={path} onNavigate={handleNavigateBack} />

        {/* Add Folder / File */}
        <div className="flex gap-3 flex-wrap items-center mb-6">
          {/* Add Folder */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl border border-gray-300 shadow-sm">
            <input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New Folder"
              className="bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500 w-32"
            />
            <button onClick={() => {
              addFolder(newFolderName);
              setNewFolderName('');
            }}>
              <Plus size={18} className="text-blue-500 hover:text-blue-600" />
            </button>
          </div>

          {/* Upload File */}
          {folderIdFromUrl !== 'root' && (
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl border border-gray-300 shadow-sm">
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="Custom File Name"
                className="bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500 w-36"
              />

              <label className="relative flex items-center gap-1 cursor-pointer text-green-600 hover:text-green-700 text-sm">
                <Plus size={18} />
                <span>Upload</span>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file || !newFileName.trim()) {
                      alert("Please provide a file and a custom name.");
                      return;
                    }

                    const formData = new FormData();
                    formData.append("doc", file);
                    formData.append("fileName", newFileName);

                    await addFile(formData);
                    setNewFileName('');
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          )}
        </div>

        {/* Folder/File Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
          {folders?.map((folder) => (
            <FolderCard
              key={folder._id}
              folder={folder}
              onOpen={handleOpenFolder}
            />
          ))}

          {files?.map((file) => (
            <FileCard key={file._id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
