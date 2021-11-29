<script setup>
import { UploadOutlined, CheckCircleFilled, DeleteFilled } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";

import Select from "@/components/select";
import { preventDefault } from "@/utils";
import { getAllImage } from "@/api";

const size = 20;

let input = document.createElement("input");
input.type = "file";
input.accept = "image/*";

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

// Select 组件
const imgs = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];
const isSelect = ref(false);
const selectedDatas = ref([]);
const selectImg = (data) => {
    if (selectedDatas.value.includes(data)) {
        return;
    };
    selectedDatas.value.push(data);
};

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
        
        <Select class="img-list picture" :data="imgs" style="margin-top: 20px;" :isSelect="isSelect" @select="selectImg" key="2">
            <template #default="{ data }">
                <a-image :src="data" />
            </template>
            <template #select-operation="{ data }">
                <CheckCircleFilled
                    style="font-size: 30px;"
                    :class="{ active: selectedDatas.includes(data) }"
                />
            </template>
            <template #operation>
                <DeleteFilled title="删除至回收站" style="font-size: 30px;"/>
            </template>
        </Select>
        
        <a-modal :visible="visible" @cancel="closeModal" @ok="closeModal" key="3">
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