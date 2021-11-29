<script setup>
import { isNumber, preventDefault } from "@/utils"
import { nextTick, ref } from "vue";

const imgs = ref([
    "/public/images/banner1.png",
    "/public/images/banner2.png",
    "/public/images/banner3.png",
]);

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
</script>

<template>
    <div
        class="settings-banner"
        ref="container"
    >
        <div
            class="settings-banner-container"
            @drag.stop="drag(index, $event)"
            @dragover.stop="dragOver(index, $event)"
            @drop.stop="drop"
            v-for="(item, index) in imgs"
            :key="index"
            :ref="addDragContainer"
        >
            <img :src="item">
            <div class="tips">
                <div class="pos-tips">
                    {{index + 1}}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
img {
    width: 100%;
}

.settings-banner {
    cursor: wait;
}

.settings-banner-container {
    position: relative;
    padding: 10px;
    border: 1px dashed #999;
    border-radius: 16px;
    margin: 20px 0;
    cursor: pointer;
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