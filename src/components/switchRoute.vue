<script setup>
import { useStore } from "vuex";

let state = useStore().state.token;
</script>

<template>
  <div class="switchRoute">
    <slot>
      <router-view v-slot="{ Component, route }">
        <transition name="switchRoute" mode="out-in" v-if="state && !route.meta.noRender">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </slot>
  </div>
</template>

<style lang="less">
.switchRoute-enter-active,
.switchRoute-leave-active {
  transition: all 0.5s linear;
}

.switchRoute-enter-from,
.switchRoute-leave-to {
  opacity: 0;
}

.switchRoute {
  height: 100%;
}
</style>