<script setup>
import { 
  DoubleRightOutlined, 
  CheckOutlined 
} from "@ant-design/icons-vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const state = defineProps({
  success: Boolean,
});
const emit = defineEmits(["verlidatorSuccess"]);
const blockStyle = ref({
  transition: "none",
  transform: `translateX(0)`,
});
const trilingStyle = ref({
  width: 0,
  transition: 'none'
});
let track = ref(null);
let block = ref(null);
let doc = document.documentElement;
let startX;
let currentX;
let targetW;
let blockW;

onMounted(() => {
  blockW = block.value.clientWidth;
  targetW = track.value.clientWidth - blockW;
});

const start = (e) => {
  if (state.success) return;
  startX = e.pageX;
  doc.addEventListener("mousemove", mouseMove);
  doc.addEventListener("mouseup", mouseUp);
};
const mouseMove = (e) => {
  currentX = e.pageX - startX;
  currentX > targetW ? (currentX = targetW) : null;
  currentX < 0 ? (currentX = 0) : null;
  trilingStyle.value.width = `${currentX + blockW}px`;
  blockStyle.value.transform = `translateX(${currentX}px)`;
};
const mouseUp = (e) => {
  if (currentX < targetW) { // 没有拖满进度条，让进度条回到原位
    trilingStyle.value.transition = blockStyle.value.transition = "all 0.2s linear";
    blockStyle.value.transform = `translateX(0)`;
    trilingStyle.value.width = "0px";
    setTimeout(() => {
      trilingStyle.value.transition = blockStyle.value.transition = "none"
    }, 200);
  } else {
    emit("verlidatorSuccess");
  }
  doc.removeEventListener("mousemove", mouseMove);
  doc.removeEventListener("mouseup", mouseUp);
};
</script>

<template>
  <div :class="{ 'validator-track': true, success }" ref="track">
    <span class="position-absoult validator-tips">
      <transition name="text" mode="out-in">
        <span v-if="!success"> 向右滑动，进行验证 </span>
        <span v-else > 验证成功 </span>
      </transition>
    </span>
    <div
      class="position-absoult validator-track-triling"
      :style="trilingStyle"
    ></div>
    <div
      class="position-absoult validator-block"
      ref="block"
      :style="blockStyle"
      @mousedown="start"
    >
      <transition name="icon" mode="out-in">
        <DoubleRightOutlined v-if="!success" />
        <CheckOutlined v-else />
      </transition>
    </div>
  </div>
</template>

<style lang="less">
.icon-enter-active,
.text-enter-active,
.icon-leave-active,
.text-leave-active {
  display: block;
  transition: all 0.4s linear;
}

.icon-enter-from,
.text-enter-from,
.icon-leave-to,
.text-leave-to {
  opacity: 0;
}

.text-enter-from {
  transform: translateY(20px);
}

.text-leave-to {
  transform: translateY(-20px);
}

.icon-enter-from {
  transform: translate(100%);
}

.icon-leave-to {
  transform: translate(-100%);
}

.validator-track {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  color: #fff;
  border-radius: 20px;
  background-color: #ffffff60;
  user-select: none;
  overflow: hidden;
}

.position-absoult {
  position: absolute;
}

.validator-tips {
  z-index: 99;
}

.validator-track-triling {
  height: 100%;
  top: 0;
  left: 0;
  background-color: #00811550;
  border-radius: 20px;
}

.validator-block {
  display: flex;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #1890ff;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.5s;
  overflow: hidden;
  z-index: 100;
}

.success .validator-block {
  color: #fff;
  background-color: #00811590;
}
</style>