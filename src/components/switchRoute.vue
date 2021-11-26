<template>
  <div class="switchRoute">
    <slot>
      <router-view v-slot="{ Component, route }">
        <transition name="switchRoute" mode="out-in">
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
</style>