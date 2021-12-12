<script setup>
import { CheckCircleFilled, DeleteFilled } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref } from "vue";
import { useStore } from "vuex";

import Select from "./select";
import { mapState } from "@/store";
import Upload from "./upload.vue";
import Loading from "./loading.vue";

const size = 20;
const store = useStore();

const visible = ref(false);

// Select 组件
const {
    images: imgs,
    isRequestImages,
    recycleImages,
} = mapState("image", ["images", "isRequestImages", "recycleImages"])
const getImages = () => {
    store.dispatch("image/getImages");
}
if (imgs.value.length === 0) {
    getImages()
};
const isSelect = ref(false);
const selectedDatas = ref([]);
const isRecycleing = ref(false);
const selectImg = (data) => {
    if (selectedDatas.value.includes(data)) {
        return;
    };
    selectedDatas.value.push(data);
    if (!isSelect.value) {
        imageTorecycle();
    }
};
const imageTorecycle = async () => {
    isRecycleing.value = true;
    await store.dispatch("image/imageToRecycle", selectedDatas.value);
    message.success("移至回收站成功");
    selectedDatas.value = [];
    isSelect.value = isRecycleing.value = false;
}

</script>

<template>
    <div class="picture-list contentBox">
        <a-space direction="vertical" :size="size" key="1">
            <a-space style="width: 100%" :size="size">
                <Upload v-model:visible="visible"></Upload>
                <a-button danger @click="isSelect = !isSelect" type="primary" :loading="isRecycleing">
                    {{ isSelect ? "取消批量删除" : "批量删除"}}
                </a-button>
                <a-button v-show="isSelect" type="primary" danger @click="imageTorecycle" :loading="isRecycleing">
                    删除至回收站
                </a-button>
            </a-space>
            <a-space style="width: 100%" :size="size">
                <a-range-picker></a-range-picker>
            </a-space>
        </a-space>
        
        <Select
            class="img-list picture"
            :data="imgs"
            style="margin-top: 20px;"
            :isSelect="isSelect"
            :render-key="(item) => item.id"
            :isRender="(item) => !recycleImages.includes(item)"
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
                    @click="selectImg(data)"
                />
            </template>
            <template #operation="{ data }">
                <DeleteFilled
                    title="删除至回收站"
                    style="font-size: 30px;"
                    @click="selectImg(data)"
                />
            </template>
        </Select>

        <a-button type="primary" class="load-more" :loading="isRequestImages" @click="getImages">
            点击加载更多数据
        </a-button>
    </div>
</template>

<style scoped lang="less">
.load-more {
    margin: 10px auto;
    display: block;
}
</style>

