<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { DeleteFilled, ReloadOutlined, CheckCircleFilled } from "@ant-design/icons-vue"

import Select from "./select";
import store, { mapState } from "@/store";

const size = 20;

const {
    recycleImages: imgs,
    images,
} = mapState("image", ["recycleImages", "images"]);

const isRequesting = ref(false);
const getRecycleImages = async () => {
    isRequesting.value = true;

    let images = await store.dispatch("image/getRecycleImages");
    if (images.length === 0) {
        message.success("数据到底了~~");
    }
    isRequesting.value = false;
};
if (imgs.value.length === 0) {
    getRecycleImages()
}

const isSelect = ref(false);
const selectedDatas = ref([]);
const selectItem = ref(null);
const selectImg = (data) => {
    if (selectedDatas.value.includes(data)) {
        return;
    };
    selectedDatas.value.push(data);
};
const deleteImg = (data) => {
    openDialog();
    selectItem.value = data;
}
const deleteImgs = () => {
    message.success("删除成功");
    selectedDatas.value = [];
    visible.value = false;
    isSelect.value = false;
    isDelete.value = false;
    isRecovery.value = false;
};

const isRecovery = ref(false);
const recoveryImg = (data) => {
    
}
// 开启批量恢复
const triggerRecovery = async () => {
    isDelete.value = false;
    isRecovery.value = isSelect.value = !isRecovery.value;
    // selectedDatas.value = [];
}
// 恢复选中的图片
const recoveryImages = async (datas) => {
    if (datas && !Array.isArray(datas)) {
        console.error("恢复图片, 参数只能是数组, 但是", datas);
        datas = null;
        return;
    };
    await store.dispatch("image/recoveryImages", datas);
    message.success("图片恢复成功");
}

const isDelete = ref(false);
const triggerDelete = () => {
    isRecovery.value = false;
    isDelete.value = isSelect.value = !isDelete.value;
    // selectedDatas.value = [];
}

const visible = ref(false);
const closeDialog = () => {
    // selectItem.value = null;
    visible.value = false;
};
const openDialog = () => {
    visible.value = true;
}
</script>

<template>
    <div class="picture-recycle contentBox">
        <a-space direction="vertical" :size="size">
            <a-space style="width: 100%" :size="size">
                <div class="recycle-ops">
                    <a-button @click="triggerRecovery" type="primary">
                        {{ isRecovery ? "取消批量恢复" : "批量恢复"}}
                    </a-button>
                    <a-button
                        v-show="isRecovery"
                        type="primary"
                        style="margin-left: 20px;"
                        @click="recoveryImages(selectedDatas)"
                    >
                        恢复
                    </a-button>
                </div>
                <div class="delete-ops">
                    <a-button danger @click="triggerDelete" type="primary">
                        {{ isDelete ? "取消批量删除" : "批量删除"}}
                    </a-button>
                    <a-button
                        v-show="isDelete"
                        type="primary"
                        danger
                        style="margin-left: 20px;"
                        @click="visible = true"
                    >
                        彻底删除
                    </a-button>
                </div>
            </a-space>
            <a-space style="width: 100%" :size="size">
                <!-- <a-input placeholder="文件名称模糊搜索" style="width: 300px"></a-input> -->
                <a-range-picker></a-range-picker>
            </a-space>
        </a-space>

        <Select
            :data="imgs"
            :is-select="isSelect"
            :is-render="(item) => !images.includes(item)"
            style="margin-top: 20px;"
            class="picture"
            @select="selectImg"
        >
            <template #default="{ data }">
                <a-image :src="data.url" />
            </template>

            <template #select-operation="{ data }">
                <CheckCircleFilled
                    style="font-size: 30px;"
                    :class="{ active: selectedDatas.includes(data) }"
                    @click="selectImg(data)"
                />
            </template>

            <template #operation="{ data }">
                <ReloadOutlined
                    style="font-size: 30px;"
                    title="恢复"
                    @click="recoveryImages([data])"
                />
                <DeleteFilled
                    style="font-size: 30px;"
                    title="彻底删除"
                    @click="deleteImg(data)"
                />
            </template>
        </Select>

        <a-button type="primary" :loading="isRequesting" @click="getRecycleImages" class="loadmore">
            点击加载更多
        </a-button>

        <a-modal :visible="visible" title="删除图片" @cancel="closeDialog" @ok="deleteImgs">
            <a-image v-if="selectItem" :src="selectItem.url" />
            <span v-show="!selectItem">确定删除所有选中图片吗?</span>
        </a-modal>
    </div>
</template>

<style lang="less" scoped>
.loadmore {
    display: block;
    margin: 10px auto;
}
</style>