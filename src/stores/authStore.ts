import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async login(email: string, password: string) {
      debugger;
      const user = await api.post('/login', {
        data: { email: email, password: password },
      });
      this.user = user.data;
    },
  },
});
