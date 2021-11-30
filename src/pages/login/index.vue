<script setup>
import { SkinTwoTone } from "@ant-design/icons-vue";
import { reactive, ref } from "@vue/reactivity";
import formData from "./form.vue";
import switchImg from "./switchImg.vue";
// import uploadImg from "@/components/upload/upload.vue";

let imageUrl = ref("");
let loading = ref(false);
let visible = ref(false);
// let visibleModal = ref(false);
// let confirmLoading = ref(false);
let getImgPath = window.localStorage.getItem("imagePath");
let setImgPath = (path) => window.localStorage.setItem("imagePath", path);

if (!getImgPath) {
  getImgPath = "url(/images/sunset-1373171_1920.jpg)";
  setImgPath(getImgPath);
}

let bgi = reactive({
  url: getImgPath,
});


let switchImage = (path) => {
  bgi.url = path;
  setImgPath(path);
};
// let userBase64 = reactive({ // 存储用户 base64
//   path: ''
// });
// let upload = () => {
//     visibleModal.value = false;
//     switchImage(`url('${userBase64.path}')`); // 存储本地
// }
</script>

<template>
  <div class="login" :style="{ backgroundImage: bgi.url }"
  >
    <div class="login-main">
      <h1>后台管理系统</h1>
      <form-data></form-data>
    </div>

    <div class="switchBackground" @click="visible = true">
      <SkinTwoTone />
    </div>

    <a-drawer
      title="点击图片切换皮肤"
      placement="right"
      :closable="false"
      v-model:visible="visible"
    >
      <switchImg @switchImage="switchImage" :getImgPath="getImgPath" />
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'center',
          zIndex: 1,
        }"
      >
        <!-- <a-button type="primary" @click="visibleModal = true">
          自定义背景
        </a-button> -->
      </div>
    </a-drawer>
    <!-- <a-modal
      centered
      title="上传背景图"
      v-model:visible="visibleModal"
      @ok="upload"
    >
      <uploadImg @switchImage="switchImage" :userBase64="userBase64"></uploadImg>
    </a-modal> -->
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
  background-size: cover;
  transition: background-image 0.3s;
}

.login-main {
  margin-top: -8%;

  h1 {
    text-align: center;
    color: #fff;
    text-shadow: 0px 0px 10px #000;
  }
}

.switchBackground {
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0px 0px 10px #ffffff50;
  background-color: #fff;
  font-size: 30px;
  cursor: pointer;
}

// .ant-modal-content {
//   border-radius: 8px !important;
//   overflow: hidden;
// }
</style>