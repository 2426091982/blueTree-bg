<script setup>
import rules from "./rules";
import validator from "./validator.vue";

import { login } from "@/api";
import { setToken } from "@/utils";
import { reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

const store = useStore();
const formRef = ref();
const router = useRouter();
let success = ref(false);
let loading = ref(false);

const labelCol = {
  span: 6,
};
const wrapperCol = {
  span: 16,
};
const formState = reactive({
  name: "",
  password: "",
  delivery: false,
});
const onSubmit = () => {
  if (!success.value) {
    message.warn("请先完成人机校验！");
    return;
  }
  formRef.value.validate().then(() => {
    loading.value = true;
    let { name: username, password, delivery } = formState;
    login(username, password)
      .then((res) => {
        let token = res.token;
        if (token) {
          store.commit("updateToken", token);
          if (delivery) {
            // 存储token到本地，以后自动登录
            setToken(token);
          }
          router.push("/");
          message.success(`欢迎您：${username}`);
        }
      })
      .catch(() => {
        success.value = loading.value = false;
        message.error("用户名或密码错误！");
      });
  });
};
const verlidatorSuccess = () => (success.value = true);
</script>

<template>
  <div class="from-main">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      resetFields
    >
      <a-form-item ref="name" label="用户名" name="name" validateFirst>
        <a-input
          v-model:value="formState.name"
          placeholder="请输入您的用户名"
        />
      </a-form-item>
      <a-form-item
        ref="password"
        label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
        name="password"
        cc-number
        validateFirst
      >
        <a-input
          v-model:value="formState.password"
          type="password"
          placeholder="请输入您的密码"
          autocomplete
        />
      </a-form-item>
      <a-form-item label="人机校验" :wrapper-col="{ span: 16, offset: 0 }">
        <validator
          :success="success"
          @verlidatorSuccess="verlidatorSuccess"
        ></validator>
      </a-form-item>
      <a-form-item label="自动登录" :wrapper-col="{ span: 16, offset: 0 }">
        <a-switch v-model:checked="formState.delivery" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 20, offset: 0 }">
        <a-button class="login-but" type="primary" @click="onSubmit" :loading="loading">登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less">
.from-main {
  margin-top: 10px;
  display: flex;
  width: 600px;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);

  form {
    width: 400px;
    user-select: none;

    .ant-form-item {
      justify-content: center;

      label {
        right: 10px;
        font-size: 14px;
      }

      .ant-input {
        height: 40px;
      }
    }

    .ant-form-item-explain-error {
      font-size: 14px;
    }

    .ant-form-item-control-input-content input {
      border-radius: 20px;
    }
  }

  .ant-row.ant-form-item:last-child {
    margin-bottom: 0;
    text-align: center;
  }
}

.login-but {
  width: 160px;
  height: 40px;
  border-radius: 20px;
}
</style>