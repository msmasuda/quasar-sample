<template>
  <q-layout>
    <q-page-container>
      <q-page class="row items-center justify-evenly">
        <q-card class="login-card">
          <q-card-main>
            <div class="row">
              <div class="col-sm-10 offset-sm-1 text-center">
                <img
                  src="~assets/quasar-logo-vertical.svg"
                  class="logo-sized"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-10 offset-sm-1 text-left">
                <h5>ログイン</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-10 offset-sm-1 text-left">
                <p style="font-size: 12px">
                  メールアドレスとパスワードを入力してください。
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-10 offset-sm-1">
                <q-input
                  v-model="email"
                  label="メールアドレス"
                  color="primary"
                  type="email"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-10 offset-sm-1">
                <q-input
                  v-model="password"
                  label="パスワード"
                  color="primary"
                  type="password"
                />
              </div>
            </div>
            <div class="row" style="padding-top: 20px">
              <div class="col-sm-10 offset-sm-1 text-right">
                <q-btn
                  color="primary"
                  style="font-weight: bold"
                  @click="handleOnClick"
                  >ログイン</q-btn
                >
              </div>
            </div>
            <br />
            <div class="row q-pl-md">
              <p style="color: #027be3; font-size: 12px">
                <router-link to="/signup">新規アカウント作成</router-link>
              </p>
            </div>
          </q-card-main>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const handleOnClick = () => {
  alert(email, password);
};
</script>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 450px
.logo-sized
  width: 150px
  margin: 20px
</style>
