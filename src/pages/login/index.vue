<script setup>
import formData from "./form.vue";
</script>

<template>
  <div class="login">
    <div class="login-main">
      <h1>后台管理系统</h1>
      <form-data></form-data>
    </div>
  </div>
</template>

<style lang="less">
.login {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(/images/sunset-1373171_1920.jpg);
  background-size: cover;
}

.login-main {
  margin-top: -8%;
  h1 {
    text-align: center;
    color: #fff;
    text-shadow: 0px 0px 10px #000;
  }
}
</style>