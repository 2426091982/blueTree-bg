<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { DeleteFilled, ReloadOutlined, CheckCircleFilled } from "@ant-design/icons-vue"
import Select from "@/components/select";
import "ant-design-vue/es/message/style/index.css";

const size = 20;

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
    isRecycle.value = false;
};

const isRecycle = ref(false);
const triggerRecycle = () => {
    isDelete.value = false;
    isRecycle.value = isSelect.value = !isRecycle.value;
    // selectedDatas.value = [];
}

const isDelete = ref(false);
const triggerDelete = () => {
    isRecycle.value = false;
    isDelete.value = isSelect.value = !isDelete.value;
    // selectedDatas.value = [];
}

const visible = ref(false);
const closeDialog = () => {
    selectItem.value = null;
    visible.value = false;
};
const openDialog = () => {
    visible.value = true;
}
</script>

<template>
    <a-space direction="vertical" :size="size">
        <a-space style="width: 100%" :size="size">
            <div class="recycle-ops">
                <a-button @click="triggerRecycle" type="primary">
                    {{ isRecycle ? "取消批量恢复" : "批量恢复"}}
                </a-button>
                <a-button v-show="isRecycle" type="primary" style="margin-left: 20px;">
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
            <a-input placeholder="文件名称模糊搜索" style="width: 300px"></a-input>
            <a-range-picker></a-range-picker>
        </a-space>
    </a-space>

    <Select :data="imgs" :is-select="isSelect" style="margin-top: 20px;" class="picture" @select="selectImg">
        <template #default="{ data }">
            <a-image :src="data" />
        </template>

        <template #select-operation="{ data }">
            <CheckCircleFilled
                style="font-size: 30px;"
                :class="{ active: selectedDatas.includes(data) }"
            />
        </template>

        <template #operation="{ data }">
            <ReloadOutlined
                style="font-size: 30px;"
                title="恢复"
            />
            <DeleteFilled
                style="font-size: 30px;"
                title="彻底删除"
                @click="deleteImg(data)"
            />
        </template>
    </Select>

    <a-modal :visible="visible" title="删除图片" @cancel="closeDialog" @ok="deleteImgs">
        <a-image v-if="selectItem" :src="selectItem" />
        <span v-show="!selectItem">确定删除所有选中图片吗?</span>
    </a-modal>
</template>