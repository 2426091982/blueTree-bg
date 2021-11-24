<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useCssModule } from "@vue/runtime-dom";
import HelloWorld from "./components/home.vue";
let style = useCssModule();
let collapsed = false;
</script>

<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo">蓝树林企业后台</div>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <i class="iconfont icon-zhuye"></i>
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <StepBackwardOutlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span slot="title">
              <i class="iconfont icon-zhuye"></i>
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3"> Tom </a-menu-item>
          <a-menu-item key="4"> Bill </a-menu-item>
          <a-menu-item key="5"> Alex </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span slot="title">
              <i class="iconfont icon-zhuye"></i>
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="6"> Tom </a-menu-item>
          <a-menu-item key="7"> Bill </a-menu-item>
          <a-menu-item key="8"> Alex </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <i class="iconfont icon-zhuye"></i>
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
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
