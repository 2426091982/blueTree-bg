<script setup>
import { isNumber, preventDefault } from "@/utils"
import loadsh from "loadsh";
import { ref, computed } from "vue";

const imgs = ref([
    "/public/images/banner1.png",
    "/public/images/banner2.png",
    "/public/images/banner3.png",
]);
let dragIndex = null;
let dropIndex = null;

const dragContainers = [];
const addDragContainer = (el) => {
    if (el) {
        dragContainers.push(el);
    }
}

const drag = (index, e) => {
    preventDefault(e);
    dragIndex = index;
}

const patch = new Proxy({

}, {
    set(target, key, value, receiver) {
        console.log(target, key, receiver);
        return true;
    }
});


let isDrop = false;
const dragOver = (index, e) => {
    preventDefault(e);
    if (!isNumber(dragIndex)) {
        return;
    };
    console.log(index, dragIndex);
    if (index === dragIndex) {
        return;
    };
    patch[dragIndex] = index;
    isDrop = true;
}
</script>

<template>
    <div class="settings-banner">
        <div
            class="settings-banner-container"
            @drag="drag(index, $event)"
            @dragover="dragOver(index, $event)"
            v-for="(item, index) in imgs"
            :key="index"
            :ref="addDragContainer"
        >
            <img :src="item">
        </div>
    </div>
</template>

<style lang="less" scoped>
img {
    width: 100%;
}
</style>