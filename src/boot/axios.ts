import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
// import router from '../router';

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

// リクエストヘッダーに、tokenをセットする
if (sessionStorage.getItem('Authorization')) {
  api.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
    'Authorization'
  )}`;
}

// レスポンス受信後の処理
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: AxiosError) => {
    if (!err.response) {
      return;
    }
    const status = err.response.status;
    if (status === 400) {
      // ステータスが「Unauthorized」の場合は、セッションストレージをクリアしてログインへ遷移
      sessionStorage.clear();
      // router.push('/login');
      return;
    }
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
