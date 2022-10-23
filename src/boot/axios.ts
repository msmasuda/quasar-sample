import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { useMessageStore } from '../stores/messageStore';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'http://192.168.100.2:3000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.request.use((config) => {
    // do something before request is sent
    // リクエストヘッダーに、tokenをセットする
    if (sessionStorage.getItem('Authorization')) {
      config.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
        'Authorization'
      )}`;
    }
    // if (store.getters.token) {
    // const tokens = getAll()
    // config.headers['access-token'] = tokens['TokenKey'];
    // config.headers['client'] = tokens['ClientKey'];
    // config.headers['uid'] = tokens['UidKey'];
    // }
    return config;
  });

  // リクエストヘッダーに、tokenをセットする
  // if (sessionStorage.getItem('Authorization')) {
  //   api.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
  //     'Authorization'
  //   )}`;
  // }

  // レスポンス受信後の処理
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (err: AxiosError) => {
      if (!err.response) {
        return;
      }
      let message;
      if (err.response.data) {
        message = err.response.data.message;
      }
      const store = useMessageStore();
      store.setMessage(message);

      const status = err.response.status;
      if (status === 401) {
        // ステータスが「Unauthorized」の場合は、セッションストレージをクリアしてログインへ遷移
        sessionStorage.clear();
        router.push({ path: '/login' });
        return;
      }
    }
  );
});

export { api };
