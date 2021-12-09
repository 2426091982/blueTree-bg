<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

import { preventDefault } from "@/utils";
import store from "@/store";
const props = defineProps({
    visible: Boolean,
    // 是否派发状态到vuex上传
    upload: {
        type: Boolean,
        default: true,
    }
});
let input = document.createElement("input");
input.type = "file";
// input.multiple = true;
// 上传图片
const files = ref(null);
const imgUrl = ref("");
const selectingFile = () => {
    input.click();
};
const selectedFile = (e) => {
    preventDefault(e);
    const file = (e.dataTransfer || e.target).files[0];
    if (imgUrl.value) {
        URL.revokeObjectURL(files.value);
    }
    imgUrl.value = URL.createObjectURL(file);
    input.value = "";
    files.value = file;
    emit("change", file)
};
input.addEventListener("change", selectedFile);

// 上传图片模态框 
// const emit = defineEmits(["update:visible", "cancel", "ok", "change"]);
const emit = defineEmits({
    "update:visible": null,
    cancel() {
        console.log(arguments);
    },
    ok() {
        console.log(arguments);

    },
    change() {
        console.log(arguments);
    }
})

const cancel = () => {
    emit("update:visible", false);
}

const ok = async () => {
    emit("ok", files.value);
    if (props.upload) {
        await store.dispatch("image/uploadImages", files.value);
        message.success("图片上传成功");
        URL.revokeObjectURL(files.value);
        imgUrl.value = "";
        files.value = null;
        cancel();
    };
}
</script>

<template>
    <slot>
        <a-button @click="emit('update:visible', true)">
            上传图片
        </a-button>
    </slot>
    <a-modal :visible="visible" @cancel="cancel" @ok="ok">
        <template #title> 新增图片 </template>
        <div
            class="upload-box"
            @click="selectingFile"
            @dragover="preventDefault"
            @drop="selectedFile"
        >
            <img :src="imgUrl" alt="" v-if="imgUrl" style="width: 100%" />
            <template v-else>
                <UploadOutlined style="font-size: 24px; margin-bottom: 10px" />
                点击或拖拽图片至此, 可以上传图片
            </template>
        </div>
    </a-modal>
</template>

<style lang="less" scoped>
.upload-box {
  padding: 10px;
  border-radius: 6px;
  border: 1px dashed #999;
  min-height: 200px;
  cursor: pointer;
  transition: border 0.3s, color 0.3s;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;

  &:hover {
    border-color: lightskyblue;
    color: lightskyblue;
  }
}
</style>