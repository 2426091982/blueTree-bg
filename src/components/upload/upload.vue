<script setup>
import { preventDefault } from "@/utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { ref } from "@vue/reactivity";
import { message } from "ant-design-vue";

let emit = defineEmits(["switchImage"]);
let props = defineProps({
  width: {
    type: [Number, String],
    default: "100%",
  },
  height: {
    type: [Number, String],
    default: "150px",
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  accept: {
    type: Array,
    default: ["jpeg", "png"],
  },
  userBase64: Object
});
let uploadStyle = {
  width: props.width,
  minHeight: props.height,
};
let loading = ref(false);
/* 解析文件后缀是否符合规定格式 */
let file;
let upload = ref(null);
let resolveSuffix = () => {
  let suffixs = props.accept;
  let suffix = file.type.split("/")[1];
  if (!suffixs.includes(suffix)) {
    message.error(`图片格式应该是：${suffixs.join("、")}`);
    return false;
  }
  return true;
};
let fileChange = (e) => {
  // 有dataTransfer属性来源就是拖拽，没有就是点击选择的
  let dataTransfer = e.dataTransfer;
  file = dataTransfer ? dataTransfer.files[0] : e.target.files[0];
  // 如果后缀格式不正确就不上传
  if (!resolveSuffix()) return;
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file); // 生成base46
  fileReader.onload = (ev) => {
    props.userBase64.path = ev.currentTarget.result;
  };
};

let select = () => upload.value.click();
let dropEnter = (e) => {
  preventDefault(e);
  fileChange(e);
};
</script>

<template>
  <div
    class="upload"
    @dragover="preventDefault"
    @drop="dropEnter"
    @click="select"
    :style="uploadStyle"
  >
    <img class="abbreviation" :src="userBase64.path"  v-if="userBase64.path" alt="">
    <template v-else>
        <plus-outlined></plus-outlined>
        <span>点击此处或拖拽文件上传</span>
    </template>
  </div>
  <input
    :style="{ display: 'none' }"
    type="file"
    ref="upload"
    @change="fileChange"
  />
</template>

<style lang="less">
.upload {
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-align: center;
  border-radius: 20px;
  border: 1px dashed #666666;
  user-select: none;
  background-size: contain;
  cursor: pointer;

  svg {
    font-size: 30px;
  }
}

.abbreviation {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>