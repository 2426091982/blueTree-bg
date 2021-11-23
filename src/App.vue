<script setup>
import NavBar from "@/components/sidebar/sidebar";
</script>

<template>
    <a-layout>
        <a-layout-sider>
            <NavBar />
        </a-layout-sider>
        <a-layout-content>
            <router-view></router-view>
        </a-layout-content>
    </a-layout>
</template>

<style lang="less">

</style>
