<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import NavBar from "@/components/sidebar/sidebar"
import BreadCrumb from "@/components/breadcrumb";
import { ref } from "@vue/reactivity";
let collapsed = ref(false);
</script>

<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
        <NavBar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <BreadCrumb />
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
          
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style lang="less">
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.logo {
  font-size: 18px;
  text-align: center;
  color: #fff;
}
</style>
