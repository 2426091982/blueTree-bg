<script setup>
import NavBar from "@/components/sidebar/sidebar";
import BreadCrumb from "@/components/breadcrumb";
import headerVue from "@/components/header/header.vue";
import zhCn from "ant-design-vue/lib/locale/zh_CN";
import switchRoute from "./components/switchRoute.vue";

import { ref } from "@vue/reactivity";

let collapsed = ref(false);
</script>

<template>
    <a-config-provider :locale="zhCn">
        <transition name="gradually" mode="out-in">
            <a-layout id="components-layout-demo-side" style="height: 100%" v-if="$store.state.token">
                <a-layout-sider v-model="collapsed" collapsible>
                    <NavBar />
                </a-layout-sider>
                <a-layout>
                    <headerVue></headerVue>
                    <a-layout-content
                        style="
                            margin: 0 16px;
                            display: flex;
                            flex-direction: column;
                            flex: 1;
                            overflow: hidden;
                        "
                        class="container"
                    >
                        <BreadCrumb />
                        <switchRoute></switchRoute>
                        </a-layout-content>
                        <a-layout-footer style="text-align: center; padding: 6px 0">
                            footer
                        </a-layout-footer>
                  </a-layout>
              </a-layout>
          <switchRoute v-else></switchRoute>
        </transition>
    </a-config-provider>
</template> 

<style lang="less">
.gradually-enter-active,
.gradually-laver-active {
  transition: all 0.5s ease-in-out;
}

.gradually-enter-from,
.gradually-laver-to {
  opacity: 0;
}

#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0                                                                                                                                                                                                                              .2);
  margin: 16px;
}
.logo {
  font-size: 18px;
  text-align: center;
  color: #fff;
}

body {
  background-color: #00000060;
}

#app {
  // overflow: hidden;
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  background-color: #fff;
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 6px;
}
.container > .switchRoute {
    padding: 24px;
    background: #fff;
    min-height: 360px;
    flex: 1;
    overflow-y: scroll;
    opacity: 1;
}
</style>
