<script setup>
import { ref, onBeforeUnmount } from 'vue';
import store, { mapState } from '@/store';
import Select from "@/pages/picture/select.vue";
import Upload from "@/pages/picture/upload.vue";

defineProps({
    src: {
        type: String,
        default: "",
    },
    width: {
        type: String,
        default: "60%",
    },
    imgWidth: {
        type: Number,
        default: 200,
    },
    column: {
        type: Object,
        default: () => ({
            all: 6,
        })
    }
});
const emit = defineEmits(["update:src", "click"]);
let {
    images
} = mapState("image", ["images"]);
function getImages() {
    store.dispatch("image/getImages");
};
if (images.value.length === 0) {
    getImages();
}

const visible = ref(false);
const select = (data) => {
    emit("update:src", data.url);
    emit("click", data);
    visible.value = false;
};
const changeVisible = (flag = false) => {
    if (flag instanceof Event) {
        flag = false;
    };
    visible.value = flag;
}
document.body.addEventListener("click", changeVisible)

onBeforeUnmount(() => {
    document.body.removeEventListener("click", changeVisible)
});

const visibleUpload = ref(false);
</script>

<template>
    <div class="select-image" v-scroll="{
        end: {
            offset: 40,
            handle: getImages,
        }
    }">
        <a-space direction="vertical">
            <a-space>
                <a-button @click.stop="visible = true">选择其他图片</a-button>
                <Upload v-model:visible="visibleUpload"></Upload>
            </a-space>
            <a-image :src="src" :width="imgWidth"></a-image>
        </a-space>
        <transition name="opacity">
            <div class="select-dropdown-container" v-if="visible" @click.stop="">
                <Select 
                    class="select-image-dropdown"
                    :data="images" 
                    :column="column"
                >
                    <template #default="{ data }">
                        <a-image :src="data.url" :preview="false" @click="select(data)">

                        </a-image>
                    </template>
                </Select>
            </div>
        </transition>
    </div>
</template>

<style lang="less" scoped>
.select-image {
    position: relative;
}
.select-dropdown-container {
    max-height: 400px;
    position: absolute;
    left: 0;
    z-index: 10;
    top: 40px;
    background-color: #fff;
    border: 1px solid #ddd;
    width: v-bind(width);
    padding: 6px;
    overflow-x: hidden;
    overflow-y: scroll;
}
:deep(.select-item) {
    margin-bottom: 10px;
    cursor: pointer;
}
</style>