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
      const user = await api.post('/login', {
        email: email,
        password: password,
      });
      if (user) {
        const { token } = user.data;
        if (!token) return;
        sessionStorage.setItem('Authorization', token);
        this.router.push({ path: '/home' });
      }
    },
    logout() {
      sessionStorage.clear();
      this.router.push({ path: '/login' });
    },
  },
});
