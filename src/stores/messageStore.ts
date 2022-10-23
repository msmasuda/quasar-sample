import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: '',
  }),
  getters: {
    getMessage: (state) => state.message,
  },
  actions: {
    setMessage(message: string) {
      this.message = message;
    },
  },
});
