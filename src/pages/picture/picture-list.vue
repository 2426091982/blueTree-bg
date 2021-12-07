<script setup>
import { UploadOutlined, CheckCircleFilled, DeleteFilled } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref, computed, effect } from "vue";
import { useStore } from "vuex";

import Select from "@/components/select";
import { preventDefault } from "@/utils";
import { uploadImage, deleteImage } from "@/api";
import { mapState } from "@/store";

const size = 20;
const store = useStore();

let input = document.createElement("input");
input.type = "file";
input.accept = "image/*";
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
    files.value = file;
    if (imgUrl.value) {
        URL.revokeObjectURL(imgUrl.value);
    }
    imgUrl.value = URL.createObjectURL(file);
    input.value = "";
};
input.addEventListener("change", selectedFile);

// 上传图片模态框 
const visible = ref(false);
const closeModal = () => {
    visible.value = false;
};
const ok = async () => {
    if (files.value) {
        let image = new FormData()
        image.set("image", files.value);
        let newImage = await uploadImage(image);
        store.commit("image/addImages", newImage);
    }
    closeModal()
}

// Select 组件
const {
    images: imgs
} = mapState("image", ["images"])
store.dispatch("image/getImages");
const isSelect = ref(false);
const selectedDatas = ref([]);
const selectImg = (data) => {
    if (selectedDatas.value.includes(data)) {
        return;
    };
    selectedDatas.value.push(data);
};
const imageTorecycle = async (id) => {
    let res = await deleteImage(id);
    message.success("移至回收站成功")
}

effect(() => {
    console.log(imgs);
})

</script>

<template>
    <div class="picture-list">
        <a-space direction="vertical" :size="size" key="1">
            <a-space style="width: 100%" :size="size">
                <a-button type="primary" @click="visible = true">上传图片</a-button>
                <a-button danger @click="isSelect = !isSelect" type="primary">
                    {{ isSelect ? "取消批量删除" : "批量删除"}}
                </a-button>
                <a-button v-show="isSelect" type="primary" danger>
                    删除至回收站
                </a-button>
            </a-space>
            <a-space style="width: 100%" :size="size">
                <a-input placeholder="文件名称模糊搜索" style="width: 300px"></a-input>
                <a-range-picker></a-range-picker>
            </a-space>
        </a-space>
        
        <Select
            class="img-list picture"
            :data="imgs"
            style="margin-top: 20px;"
            :isSelect="isSelect"
            @select="selectImg"
            key="2"
        >
            <template #default="{ data }">
                <a-image
                    :src="data.url"
                />
            </template>
            <template #select-operation="{ data }">
                <CheckCircleFilled
                    style="font-size: 30px;"
                    :class="{ active: selectedDatas.includes(data) }"
                />
            </template>
            <template #operation="{ data }">
                <DeleteFilled
                    title="删除至回收站"
                    style="font-size: 30px;"
                    @click="imageTorecycle(data.id)"
                />
            </template>
        </Select>
        
        <a-modal :visible="visible" @cancel="closeModal" @ok="ok" key="3">
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
    </div>
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