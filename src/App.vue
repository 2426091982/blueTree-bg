<script setup>
import NavBar from "@/components/sidebar/sidebar";
import BreadCrumb from "@/components/breadcrumb";
import headerVue from "@/components/header/header.vue";
import zhCn from "ant-design-vue/lib/locale/zh_CN";
import switchRoute from "./components/switchRoute.vue";

import "ant-design-vue/es/message/style/index.css";

import { ref } from "@vue/reactivity";

let collapsed = ref(false);
</script>

<template>
  <a-config-provider :locale="zhCn">
    <a-layout id="components-layout-demo-side" style="height: 100%"
    v-if="$route.path !== '/login'">
        <a-layout-sider v-model="collapsed" collapsible>
            <div class="logo">蓝树林官网后台</div>
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
                <switchRoute :class="{ noBreadcrumb: $route.meta.noBreadCrumb }"></switchRoute>
            </a-layout-content>
            <a-layout-footer style="text-align: center; padding: 6px 0">
                footer
            </a-layout-footer>
        </a-layout>
    </a-layout>
    <router-view v-else />
  </a-config-provider>
</template> 

<style lang="less">
.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.5s ease-in-out;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
}
.logo {
  font-size: 18px;
  text-align: center;
  color: #fff;
}

// body {
//   background-color: #00000060;
// }

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
    flex: 1;
    opacity: 1;
    overflow: hidden;
}

.contentBox {
    overflow-y: scroll;
    padding: 24px;
    height: 100%;
    min-height: 360px;
    background: #fff;
}

.login-container {
    height: 100%;
}
</style>
