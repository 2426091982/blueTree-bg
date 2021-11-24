<template>
    <div class="drag-img-container">
        {{imgs}}
        <template
            v-for="(item, index) in imgs"
            :key="index"
        >
            <div 
                class="drag-img"
                @drop="drop"
                @dragover="dragover"
                @dragstart="dragstart"
                :index.prop="index"
            >
                <img
                    :src="item"
                    :index.prop="index"
                >
            </div>
        </template>
    </div>
</template>
<script setup>
import { ref, nextTick, effect, watch } from "vue";

const imgs = ref([
    "/public/images/banner1.png",
    "/public/images/banner2.png",
    "/public/images/banner3.png",
])
let targetDragEl = null;  // 鼠标拖拽的元素
let currenDragtEl = null; // 鼠标悬浮, 位置互换的元素的元素
let targetIndex = null;
let currentIndex = null;
let isMove = false;
let isDrop = false;
let transitionendFn = null;

const transitionend = () => {
    isDrop = true;
    let targetData = imgs.value[targetIndex];
    let currentData = imgs.value[currentIndex];
    imgs.value[currentIndex] = targetData;
    imgs.value[targetIndex] = currentData;
    nextTick(() => {
    targetDragEl.style.transition = currenDragtEl.style.transition = "";
    targetDragEl.style.transform = currenDragtEl.style.transform = "";
    });
}

const transitionstart = () => {
    isMove = true;
}

const dragstart = (e) => {
    if (isMove) {
        return;
    };
    targetIndex = e.target.index;
    targetDragEl = e.target.parentElement || targetDragEl;
}

const drop = (e) => {
    // console.log(e);
    // imgs.value.splice(currentIndex, 1, targetData);
    // imgs.value.splice(targetIndex, 1, currentData)
    // console.log(imgs.value, currentIndex, targetIndex);
    // targetDragEl = null;
}

const dragover = (e) => {
    e.preventDefault();
    if (isMove || !targetDragEl) {
        return;
    };
    let dragIndex = parseInt(e.target.index);
    if (currentIndex !== dragIndex && dragIndex !== targetIndex) {
        currentIndex = dragIndex;
    };
    let currentEl = e.target.parentElement;
    let height = currentEl.clientHeight + 10;
    if (currentEl === targetDragEl || !currentEl.classList.contains("drag-img")) {
        return;
    };
    currenDragtEl = currentEl;
    currentEl && (currentEl.style.transform = `translateY(-${(height * targetIndex || height)}px)`);
    targetDragEl && (targetDragEl.style.transform = `translateY(${height * currentIndex}px)`);
    currentEl.removeEventListener("transitionend", transitionend);
    currentEl.removeEventListener("transitionstart", transitionstart);
    currentEl.addEventListener("transitionend", transitionend);
    currentEl.addEventListener("transitionstart", transitionstart);
}
</script>

<style lang="less" scoped>
img {
    width: 100%;
}

.drag-img {
    padding: 14px;
    box-sizing: border-box;
    border: 1px dashed #999;
    cursor: pointer;
    margin: 10px 0;
    transition: border-color .3s, transform .3s;
    border-radius: 12px;
    // position: relative;
    
    &:hover {
        border-color: lightskyblue;
    }
}


</style>