<template>
    <div class="switchRoute">
        <router-view v-slot="{ Component, route }">
            <transition name="switchRoute" mode="out-in" >
                <component :is="Component" :key="route.path" />
            </transition>
        </router-view>
    </div>
</template>

<style lang="less">
// .switchRoute-leave-active {
//   position: absolute!important;
//   left: 0;
//   top: 0;
//   width: 100%;
// }
.switchRoute-enter-active,
.switchRoute-leave-active {
  transition: all .5s;
}

.switchRoute-enter-from,
.switchRoute-leave-to {
  opacity: 0!important;
}

// .switchRoute {
//   height: 100%;
//   opacity: 1;
//   position: relative;
// }

.switchRoute.noBreadcrumb {
    margin-top: 20px;
}
</style>