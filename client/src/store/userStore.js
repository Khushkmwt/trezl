import { create } from 'zustand';
import API from '../server/axios';


const useUserStore = create((set,get) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
  userList : [] , 
  searchUsers: async (searchTerm) => {
    const res = await API.get('/users/search',{
     params:{searchTerm}
    })
    set({userList : res.data.data})
  },
}));

export default useUserStore;
