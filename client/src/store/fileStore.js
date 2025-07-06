import { create } from 'zustand';
import API from '../server/axios';

const useFileStore = create((set, get) => ({
  currentFolderId: 'root',
  path: [{ name: 'Root', id: 'root' }],
  folders: [],
  files: [],

  fetchFolder: async (folderId = 'root') => {
    try {
      const res = await API.get(`/folders/${folderId}`);
      // console.log(res.data.data)
      set({
        currentFolderId: folderId,
        folders: res.data?.data?.folders,
        files: res.data?.data?.files,
      });
    } catch (err) {
      console.error('Error fetching folder:', err);
    }
  },

  goToFolder: (id, name) => {
    const { path, fetchFolder } = get();
    set({ path: [...path, { id, name }] });
    fetchFolder(id);
  },

  goBackTo: (index) => {
    const { path, fetchFolder } = get();
    const newPath = path.slice(0, index + 1);
    set({ path: newPath });
    fetchFolder(newPath[index].id);
  },

  addFolder: async (name) => {
    const { currentFolderId, fetchFolder } = get();
    if (!name.trim()) return;

    const payload = {
     foldername: name,
     parentFolder: currentFolderId === 'root' ? null : currentFolderId,
    };

   await API.post('/folders/create', payload);
   fetchFolder(currentFolderId);
  },

  addFile: async (formData) => {
    const { currentFolderId, fetchFolder } = get();
    if (!formData || !formData.has("doc")) return;
   formData.append("folderId", currentFolderId);
   const res = await API.post('/files/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  console.log(res)
    fetchFolder(currentFolderId);
  },
}));

export default useFileStore;
