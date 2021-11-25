<script setup>
import { login } from "@/api";
import { setToken } from "@/utils";
import { reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import rules from "./rules";
import validator from "./validator.vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

const store = useStore();
const formRef = ref();
const router = useRouter();
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
  formRef.value.validate().then(() => {
    let { name: username, password, delivery } = formState;
    login(username, password)
      .then((res) => {
        let token = res.token;
        if (token) {
          store.commit('updateToken', token);
          if (delivery) {
            // 存储token到本地，以后自动登录
            setToken(token);
          }
          router.push("/");
          message.success(`欢迎您：${ username }`);
        }
      })
      .catch(() => {
        message.error("用户名或密码错误！");
      });
  });
};
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
        />
      </a-form-item>
      <a-form-item label="自动登录">
        <a-switch v-model:checked="formState.delivery" />
      </a-form-item>
      <validator></validator>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less">
.from-main {
  position: relative;
  top: -5%;
  display: flex;
  width: 600px;
  height: 350px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  form {
    width: 400px;
    label {
      right: 10px;
    }
    .ant-form-item {
      justify-content: center;
      label {
        font-size: 14px;
      }
      .ant-input {
        height: 35px;
      }
    }
    .ant-form-item-explain-error {
      font-size: 14px;
    }
  }
}
</style>