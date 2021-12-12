<script setup>
import { ref, watch, reactive } from "vue";
import { isNumber, preventDefault } from "@/utils"
import store, { mapState } from "@/store";
import SelectImage from "@/components/select-image.vue";
import dayjs from "dayjs";
import { message } from "ant-design-vue";

// 拖拽的所有元素
const dragContainers = [];
const addDragContainer = (el) => {
    if (el) {
        dragContainers.push(el);
    }
}

// 触发动画时拖拽不做任何动作的节流阀
let isMove = false;
// 拖拽元素的父元素
const container = ref();
// 移动元素
const move = (currentIndex, targetIndex) => {
    isMove = true;
    let dragEl = dragContainers[currentIndex];
    let dropEl = dragContainers[targetIndex];

    let dragData = imgs.value[currentIndex];
    let dropData = imgs.value[targetIndex];

    dragEl.style.transition = dropEl.style.transition = "transform .3s";
    dragEl.style.transform = `translateY(${dropEl.offsetTop - dragEl.offsetTop}px)`;
    dropEl.style.transform = `translateY(${dragEl.offsetTop - dropEl.offsetTop}px)`;
    dropEl.addEventListener("transitionend", function transitionend() {
        dragEl.style.transition = dropEl.style.transition = "";
        dragEl.style.transform = dropEl.style.transform = "";
        imgs.value[currentIndex] = dropData;
        imgs.value[targetIndex] = dragData;
        dragIndex = targetIndex;
        dropEl.removeEventListener("transitionend", transitionend);
        isMove = false;
    });
}

let dragIndex = null; // 拖拽中的元素
let isDrag = false;
// 拖拽开始
const drag = (index, e) => {
    preventDefault(e);
    if (isDrag) {
        return;
    };
    dragIndex = index;
    isDrag = true;
}
// 拖拽中
const dragOver = (index, e) => {
    preventDefault(e);
    if (!isNumber(dragIndex) || isMove) {
        return;
    };
    if (index === dragIndex) {
        return;
    };
    move(dragIndex, index);
}
// 拖拽结束
const drop = (e) => {
    preventDefault(e);
    isDrag = false;
}

let {
    carouselConf
} = mapState("settings", ["carouselConf"]);
const imgs = ref([]);
watch(
    () => carouselConf.value,
    (value) => {
        imgs.value = [...value];
    },
    {
        immediate: true,
        deep: true,
    }
)

const visible = ref(false);
const src = ref("");
const addCarousel = () => {
    if (isUpdateCarousel.value) {
        store.commit("settings/updateCarousel", {
            index: currentCarouselIndex.value,
            url: src.value
        });
        currentCarouselIndex.value = null;
    } else {
        store.commit("settings/addCarousel", {
            date: dayjs(new Date()).format("YYYY-MM-DD HH:MM:ss"),
            url: src.value,
        });
    }
    src.value = "";
    cancel();
};
const isUpdateCarousel = ref(false);
const cancel = () => {
    visible.value = false;
    isUpdateCarousel.value = false;
}
const contextMenuStateStyle = reactive({
    left: 0,
    top: 0,
});
const currentCarouselIndex = ref(null);
const contextMenuVisible = ref(false);
const contextMenuEl = ref(null);
const closeContextMenuVisible = () => {
    contextMenuVisible.value = false;
};
const openContextMenuVisible = (index, currentCarouselUrl, e) => {
    preventDefault(e);
    let left = e.clientX;
    let top = e.clientY;
    if (left + contextMenuEl.value.clientWidth > document.body.clientWidth) {
        left = document.body.clientWidth - contextMenuEl.value.clientWidth - 30;
    };
    left += "px";
    top += "px";
    currentCarouselIndex.value = index;
    contextMenuStateStyle.left = left;
    contextMenuStateStyle.top = top;
    contextMenuVisible.value = true;
    src.value = currentCarouselUrl;
    console.log(src.value);
}
const carouselUpdate = () => {
    isUpdateCarousel.value = true;
    visible.value = true;
    contextMenuVisible.value = false;
};
const carouselDelete = () => {

};
const patchCarousel = async () => {
    await store.dispatch("settings/patchSettings", {
        carousel: imgs.value
    });
    message.success("修改成功");
}
document.body.addEventListener("click", closeContextMenuVisible);
</script>

<template>
    <div class="settings-banner contentBox">
        <a-space style="margin-bottom: 10px;">
            <a-button @click="visible = true">新增轮播图</a-button>
            <a-button type="primary" @click="patchCarousel">保存</a-button>
        </a-space>
        <div
            class="settings-banner-container"
            ref="container"
        >
            <div
                class="settings-banner-item"
                @drag.stop="drag(index, $event)"
                @dragover.stop="dragOver(index, $event)"
                @drop.stop="drop"
                v-for="(item, index) in imgs"
                :key="index"
                :ref="addDragContainer"
                @contextmenu.stop="openContextMenuVisible(index, item.url, $event)"
            >
                <img :src="item.url">
                <div class="tips">
                    <div class="pos-tips">
                        {{index + 1}}
                    </div>
                </div>
            </div>
        </div>

        <transition name="contextmenu">
            <div
                class="settings-banner-contextmenu"
                :style="contextMenuStateStyle"
                ref="contextMenuEl"
                v-show="contextMenuVisible"
            >
                <div
                    class="settings-banner-contextmenu-update"
                    @click.stop="carouselUpdate"
                >
                    更换图片
                </div>
                <div
                    class="settings-banner-contextmenu-delete"
                    @click.stop="carouselDelete"
                >
                    删除
                </div>
            </div>
        </transition>
        
        <a-modal
            :title="
                isUpdateCarousel ? '更换轮播图图片' : '新增轮播图图片'
            "
            v-model:visible="visible"
            @ok="addCarousel"
            @cancel="cancel"
        >
            <SelectImage
                v-model:src="src"
                width="100%"
                :column="{ all: 4 }"
                :imgWidth="472"
            >

            </SelectImage>
        </a-modal>
    </div>
</template>

<style lang="less" scoped>
img {
    width: 100%;
}
.contextmenu-enter-from,
.contextmenu-leave-to {
    transform: scale(0);
}
.settings-banner {
    // position: relative;
    // transform: scale(1);
}
.settings-banner-container {
    // cursor: wait;
}
.settings-banner-contextmenu {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 6px;
    text-align: center;
    width: 100px;
    overflow: hidden;
    border: solid 1px #ddd;
    transition: transform .3s, top, .3s, left .3s;
    transform-origin: left top;

    > * {
        padding: 10px;
        // background-color: rgba(26, 26, 26, 0.8);
        // color: #fff;
        background-color: #fff;
        transition: background-color .3s;
        cursor: pointer;
        &:hover {
            background-color: #f2f2f2;
        }
    }
}
.settings-banner-item {
    position: relative;
    padding: 10px;
    border: 1px dashed #999;
    border-radius: 16px;
    margin: 20px 0;
    cursor: pointer;

    &:last-child {
        margin: 0;
    }
}
.tips {
    position: absolute;
    left: 10px;
    top: 10px;
}

.pos-tips {
    font-size: 18px;
    padding: 10px;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
}
</style>